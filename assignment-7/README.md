# Assignment-7

## Project Description : Google Sheet (SpreadSheet)
## Requirements <hr>
### User Requirements:

1. As a user, I should be able to add rows to the spreadsheet using a plus button.
2. As a user, I should be able to add columns to the spreadsheet using a plus button.
3. As a user, I should be able to delete rows on the spreadsheet using a minus button.
4. As a user, I should be able to delete columns on the spreadsheet using a minus button.
5. As a user, I should be able to select multiple rows or columns and display their sum in a cell by using a formula. The formula should be of the format "=SUM(START_CELL:END_CELL)". Example "=SUM(A1:A10)" to display the sum of all items from cell A1 to A10. Any changes to the cell content in the selected range should update the sum.
6. As a user, I should be able to perform simple algebraic operations (+, -, *, /) with cell references. Example "=A1+A2".
7. As a user, I should be able to export the sheet as a CSV file.
8. As a user, I should be able to load a CSV from the node server by clicking a load button.

### Technical Requirements:

1. The goal of this assignment is to learn about JavaScript events & RxJS.
2. Events for the formula should be implemented using RxJS and buttons can use simple event listeners.
3. On clearing formula, all subscribers and events should be cleared from the page.
4. No javascript frameworks should be used except RxJS.
5. No CSS frameworks should be used.
6. Should use ES6 syntax.
7. Should document your code extensively.
8. Should have .gitignore, ReadMe.md files.
9. ReadMe.md file should have markdown with project description and instructions to run the project.

### Mock Screen Shots <hr>
<img width="1548" alt="Screen Shot 2020-11-09 at 9 18 28 PM" src="https://user-images.githubusercontent.com/71218150/98630966-29d0ef80-22d1-11eb-9c11-62beda88e6ad.png">



### Instructions to Setup this Project <hr>
<pre><code>
- npm init<br>
- npm install node-sass --save <br>
- npm install http-server<br>
- npm install rxjs <br>
- add script values as below to setup sass and http server <br>
       "scripts": {
          "sass": "node-sass scss/main.scss --output dist",
          "start": "http-server -a localhost -p 8000 -c-1"
        }
- npm run sass
- npm start </code> </pre>


### Instructions to Run this Project <hr>
- Download Visual Code Link
- Git Clone this repo using git commands
- Open this project in Visual Code
- Right Click on index.html and open that in browser or use Live extension of vscode
### Developed by <hr>
🌱 Name : Shivi Bhatt<br>
🎓 NUID : 001027605<br>
✉️ Email: bhatt.s@northeastern.edu<br>
