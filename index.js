const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// Rendering function
// const render = require("./lib/htmlRenderer");
// Alternative rendering function
const render = require("./lib/page-template.js");
const Employee = require("./lib/Employee");


const teamMembers = [];
const idArray = [];

function appMenu() {
  function createManager() {
    console.log("Please build your team");
    inquirer.prompt([
      {
        type: "input",
        message: "Please enter your name:",
        name: "managerName"
      },
      {
        type: "input",
        message: "Please enter your ID:",
        name: "managerId",
        validate: check = (value) => {
          if (!isNaN(value)) {
            return true;
          }
          return "Please enter valid ID, numbers only";
        }  
      },
      {
        type: "input",
        message: "Please enter your Email:",
        name: "managerEmail",
        validate: check = (value) => {
          if (value.includes("@") && value.includes(".")) {
            return true;
          }
          return "Please enter valid email address";
        }
      },
      {
        type: "input",
        message: "Please enter your office number:",
        name: "managerOfficeNumber"
      }
      // Strongly recommend to add validate property function for id and email
    ]).then(answers => {
      const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
      teamMembers.push(manager);
      idArray.push(answers.managerId);
      createTeam();
    });
  }

  function createTeam() {

    inquirer.prompt([
      {
        type: "list",
        name: "memberChoice",
        message: "Which type of team member would you like to add?",
        choices: [
          "Engineer",
          "Intern",
          "I don't want to add any more team members"
        ]
      }
    ]).then(userChoice => {
      switch(userChoice.memberChoice) {
      case "Engineer":
        addEngineer();
        break;
      case "Intern":
        addIntern();
        break;
      default:
        buildTeam();
      }
    });
  }

  function addEngineer() {
    inquirer.prompt([
      {
        type: "input",
        message: "Please enter their name: ",
        name: "engName"
      },
      {
        type: "input",
        message: "Please enter their ID: ",
        name: "engId",
        validate: check = (value) => {
          if (!isNaN(value)) {
            return true;
          }
          return "Please enter valid ID, numbers only";
        }
      },
      {
        type: "input",
        message: "Please enter their email: ",
        name: "engEmail",
        validate: check = (value) => {
          if (value.includes("@") && value.includes(".")) {
            return true;
          }
          return "Please enter valid email address";
        }
      },
      {
        type: "input",
        message: "Please enter their Github: ",
        name: "engGithub"
      }
    ]).then(answers => {
      const engineer = new Engineer(answers.engName, answers.engId, answers.engEmail, answers.engGithub);
      teamMembers.push(engineer);
      idArray.push(answers.engId);
      createTeam();
    });
  }

  function addIntern() {
    inquirer.prompt([
      {
        type: "input",
        message: "Please enter their name: ",
        name: "internName"
      },
      {
        type: "input",
        message: "Please enter their ID: ",
        name: "internId",
        validate: check = (value) => {
          if (!isNaN(value)) {
            return true;
          }
          return "Please enter valid ID, numbers only";
        }
      },
      {
        type: "input",
        message: "Please enter their email: ",
        name: "internEmail",
        validate: check = (value) => {
          if (value.includes("@") && value.includes(".")) {
            return true;
          }
          return "Please enter valid email address";
        }
      },
      {
        type: "input",
        message: "Please enter their school: ",
        name: "internSchool"
      }
    ]).then(answers => {
      const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
      teamMembers.push(intern);
      idArray.push(answers.internId);
          createTeam();
    });
  }

  function buildTeam() {
    // Create the output directory if the output path doesn't exist
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
  }

  createManager();

}


appMenu();
