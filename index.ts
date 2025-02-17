import * as readline from "readline-sync";
import { Car } from "./interfaces";

let carsData: Car[];
async function loadCarsData() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/S155207/project-json/refs/heads/main/cars.json');
        carsData = await response.json();
        showMenu();
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

function showMenu() {
    const choices: string[] = ["View all data", "Filter by ID", "Exit"];

    let index: number = 0;
    while (index < 2) {
        console.log("Welcome to the JSON data viewer!");

        index = readline.keyInSelect(choices, "Please enter your choice", { cancel: false });

        switch (index) {
            case 0:
                showData();
                break;
            case 1:
                filterDataById();
            default:
                break;
        }
    }
}

function showData() {
    console.log();

    const maxLength: number = Math.max(...carsData.map(car => car.name.length));
    carsData.forEach((car: Car) => {
        const padding: string = ' '.repeat(maxLength - car.name.length) // calculate padding
        console.log(`- ${car.name}${padding} (${car.id})`);
    })

    console.log();
    readline.question("Press Enter to continue...");
    console.clear();
}

function filterDataById() {
    console.log();

    const id: string = readline.question("Please enter the ID you want to filter by: ");
    console.log();    
    const car = carsData.find(car => car.id === id);
    if (car) {
        console.log(`- ${car.name} (${car.id})\n` +
            `  - Description: ${car.description}\n` +
            `  - Engine: ${car.engine}\n` +
            `  - Top speed: ${car.topSpeed} mph\n` +
            `  - Year: ${car.year}\n` +
            `  - Manufacture date: ${car.manufactureDate}\n` +
            `  - Currently available: ${car.currentlyAvailable ? "Yes" : "No"}\n` +
            `  - Price: $${car.price}\n` +
            `  - Photo: ${car.photo}\n` +
            `  - Features: ${car.features[0]}, ${car.features[1]}, ${car.features[2]}\n` +
            `  - Transmission type: ${car.transmissionType}\n` +
            `  - Manufacturer: ${car.manufacturer.name} (${car.manufacturer.id})\n` +
            `    - Name: ${car.manufacturer.name}\n` +
            `    - Location: ${car.manufacturer.location}\n` +
            `    - Founded: ${car.manufacturer.founded}\n` +
            `    - CEO: ${car.manufacturer.CEO}\n` +
            `    - logo ${car.manufacturer.logo}\n`
        );
    } else {
        console.log(`Car with ID "${id}" not found!`);
    }

    console.log();
    readline.question("Press Enter to continue...");
    console.clear();
}

loadCarsData();