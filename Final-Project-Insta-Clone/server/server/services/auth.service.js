/* importing user model */
import User from '../models/user';
/* importing bcrypt */
import bcrypt from 'bcryptjs';
/* iporting express */
import express from 'express';
/* importing mongoose */
import mongoose from 'mongoose';
/* importing jwt token */
import jwt from 'jsonwebtoken';
/* importing JWT_SECRET from keys */
import {JWT_SECRET} from '../keys';
/* importing nodemailer */
import nodemailer from 'nodemailer';
/* importing sendgridTransport */
import sendgridTransport from 'nodemailer-sendgrid-transport';
/* importing crypto */
import crypto from 'crypto';

/* creating transporter with the api key to send emails */
const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: "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"
    }
}))

/**
 * signin service
 * @param {*} req 
 * @param {*} res 
 */
const signin = (req,res) => {
    /* fetching email and password from the request body */ 
    const {email,password} = req.body
    if(!email || !password){
       return res.status(422).json({error:"please add email or password"})
    }
    const promise = User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
           return res.status(422).json({error:"Invalid Email or password"})
        }
        return bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
                const {_id,name,email,followers,following,pic} = savedUser;
                return res.json({token,user:{_id,name,email,followers,following,pic}});
            }
            else{
                return res.status(422).json({error:"Invalid Email or password"})
            }
        })
    })
    return promise;
}

/**
 * signup service
 * @param {*} req 
 * @param {*} res 
 */
const signup = (req,res) => { 
    const {name,email,password, pic} = req.body 
    if(!email || !password || !name){
       return res.status(422).json({error:"Add all the fields"})
    }
    const promise = User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
          return res.status(422).json({error:"User already exists"})
        }
        return bcrypt.hash(password,12)
        .then(hashedpassword=>{
            const user = new User({
                email,
                /* hashing the password */
                password:hashedpassword,
                name,
                pic
            })      
            return user.save()
                .then(user=>{
                    /* sending the welcome email on user signup */
                    transporter.sendMail({
                        to: user.email,
                        from: "deshpande.m@northeastern.edu",
                        subject: "Signup Success",
                        html: "<h1>Welcome to Instagram</h1>"
                    })
                    return res.json({message:"saved successfully"})
                })
                .catch(err=>{
                    console.log(err)
                })
        })
       
    })
    .catch(err=>{
      console.log(err)
    })
    return promise;
}

/**
 * reset password service
 * @param {*} req 
 * @param {*} res 
 */
const resetPassword = (req, res) => {
    const promise = crypto.randomBytes(32,(err,buffer)=>{
                if(err){
                    console.log(err)
                }
                const token = buffer.toString("hex")
                console.log(token, req.body.email);
                return User.findOne({email:req.body.email})
                .then(user=>{
                    if(!user){
                        return res.status(422).json({error:"User dont exists with that email"})
                    }
                    user.resetToken = token
                    /* reset password link expiration time 1 hour */
                    user.expireToken = Date.now() + 3600000
                    return user.save().then((result)=>{
                        /* sending the reset password email */
                        transporter.sendMail({
                            to:user.email,
                            from:"deshpande.m@northeastern.edu",
                            subject:"password reset",
                            html:`
                            <p>You requested for password reset</p>
                            <h5>click in this <a href="http://localhost:3001/reset/${token}">link</a> to reset password</h5>
                            `
                        })
                        return res.json({message:"check your email"})
                    })
        
                })
            })
            return promise;
}

/**
 * setting new password service
 * @param {*} req 
 * @param {*} res 
 */
const newPassword = (req, res) => {
    const newPassword = req.body.password
    const sentToken = req.body.token
    const promise = User.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
    .then(user=>{
        if(!user){
            return res.status(422).json({error:"Try again session expired"})
        }
        return bcrypt.hash(newPassword,12).then(hashedpassword=>{
           user.password = hashedpassword
           user.resetToken = undefined
           user.expireToken = undefined
           return user.save().then((saveduser)=>{
               return res.json({message:"password updated success"})
           })
        })
    })
    return promise;

}

/* exporting default functions */
export default {
    signin: signin,
    signup: signup,
    resetPassword: resetPassword,
    newPassword: newPassword
}