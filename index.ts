import * as readline from "readline-sync";
import { Car } from "./interfaces";
import carsData from "./cars.json";
import { features } from "process";

const choices: string[] = ["View all data", "Filter by ID", "Exit"];

let index: number = 0;
while (index < 2) {
    index = readline.keyInSelect(choices, "Please enter your choice", {cancel: false});    

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
    const car = carsData.find(car => car.id === id);
    if (car) {
        console.log(`- ${car.name} (${car.id})\n` +
                    `   - Description: ${car.description}\n` +
                    `   - Engine: ${car.engine}\n` +
                    `   - Top speed: ${car.topSpeed}\n` +
                    `   - Year: ${car.year}\n` +
                    `   - Manufacture date: ${car.manufactureDate}\n` +
                    `   - Currently available: ${car.currentlyAvailable ? "Yes" : "No"}\n` +
                    `   - Price: ${car.price}€\n` +
                    `   - Photo: ${car.photo}\n` +
                    `   - Features: ${car.features[0]}, ${car.features[1]}, ${car.features[2]}\n`
        );
    } else {
        console.log(`Car with ID "${id}" not found!`);
    }

    console.log();
    readline.question("Press Enter to continue...");
    console.clear();
}