// import React, { Component } from 'react';
// import * as Database from './Database';

// class HeroInsert extends Component {
//     state = {
//         name: '',
//         color: ''
//     }
//     // subs = []

//     addHero = async (event) => {
//         event.preventDefault();
//         const { name, color } = this.state;
//         const db = await Database.get();

//         const addData = {
//             name,
//             color
//         };
//         await db.heroes.insert(addData);
//         this.setState({
//             name: '',
//             color: ''
//         });
//     }
//     handleNameChange = (event) => {
//         this.setState({ name: event.target.value });
//     }
//     handleColorChange = (event) => {
//         this.setState({ color: event.target.value });
//     }

//     render() {
//         return (
//             <div id="insert-box" className="box">
//                 <h3>Add Colors and names</h3>
//                 <form onSubmit={this.addHero}>
//                     <label>Name:</label>
//                     <input name="name" type="text" placeholder="Enter the Name" value={this.state.name} onChange={this.handleNameChange} /><br/>
//                     <label>Your Favorite color:</label>
//                     <input name="color" type="text" placeholder="Enter the color" value={this.state.color} onChange={this.handleColorChange} /><br/>
//                     <button type="submit">Insert</button>
//                 </form>
//             </div>
//         );
//     }
// }

// export default HeroInsert;

import React, { useState, useEffect } from "react";
import * as Database from "./Database";

const HeroInsert = () => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    // Initialize the database asynchronously
    async function initializeDatabase() {
      const db = await Database.get();
      // You can access your 'heroes' collection using db.heroes
      // Perform any database-related tasks here
    }

    initializeDatabase();
  }, []); // The empty dependency array ensures this effect runs only once

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from submitting in the traditional way

    // Insert data into the 'heroes' collection
    const data = {
      name,
      color,
    };

    try {
      const db = await Database.get();
      const insertedHero = await db.heroes.insert(data);
      console.log("Inserted hero:", insertedHero);
      // Optionally, you can reset the form fields here
      setName("");
      setColor("");
    } catch (error) {
      console.error("Error inserting hero:", error);
    }
  };

  return (
    <div id="insert-box" className="box">
      <h3>Add Colors and Names</h3>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          name="name"
          type="text"
          placeholder="Enter the Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <br />
        <label>Your Favorite Color:</label>
        <input
          name="color"
          type="text"
          placeholder="Enter the Color"
          value={color}
          onChange={(e) => {
            setColor(e.target.value);
          }}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default HeroInsert;
