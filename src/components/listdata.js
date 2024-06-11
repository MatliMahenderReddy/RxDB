// import React, { Component } from 'react';
// import * as Database from './Database';
// import './insertdata.css';

// class HeroList extends Component {
//     state = {
//         heroes: null,
//         loading: true
//     };
//     subs = [];

//     async componentDidMount() {
//         const db = await Database.get();

//         const sub = db.heroes.find({
//             selector: {},
//             sort: [
//                 { name: 'asc' }
//             ]
//         }).$.subscribe(heroes => {
//             if (!heroes) {
//                 return;
//             }
//             console.log('reload heroes-list ');
//             console.dir(heroes);
//             this.setState({
//                 heroes,
//                 loading: false
//             });
//         });
//         this.subs.push(sub);
//     }

//     componentWillUnmount() {
//         this.subs.forEach(sub => sub.unsubscribe());
//     }

//     deleteHero = async (hero) => {
//         console.log('delete hero:');
//         console.dir(hero);
//         await hero.remove();
//     }

//     editHero = async (hero) => {
//         console.log('edit hero:');
//         console.dir(hero);
//     }

//     render() {
//         const { heroes, loading } = this.state;
//         return (
//             <div id="list-box" className="box">
//                 <h3>Data</h3>
//                 {loading && <span>Loading...</span>}
//                 {!loading && heroes.length === 0 && <span>No Data</span>}
//                 {!loading &&
//                     <ul id="heroes-list">
//                         {heroes.map(hero => {
//                             return (
//                                 <li key={hero.name}>
//                                    <div className='actions'> 
//                                     <div className="color-box" style={{
//                                         background: hero.color
//                                     }}>{hero.color}</div>
//                                     <span className="name">
//                                         {hero.name}
//                                     </span>
//                                     <div className="">
//                                         {/* <i className="fa fa-pencil-square-o" aria-hidden="true" onClick={() => this.editHero(hero)}></i> */}
//                                         <span className="delete fa fa-trash-o" aria-hidden="true" onClick={() => this.deleteHero(hero)}>DELETE</span>
//                                     </div>
//                                     </div>
//                                 </li>
//                             );
//                         })}
//                     </ul>
//                 }
//             </div>
//         );
//     }
// }

// export default HeroList;

import React, { useEffect, useState } from 'react';
import * as Database from './Database';
import './insertdata.css';

const HeroList = () => {
  const [heroes, setHeroes] = useState(null);
  const [loading, setLoading] = useState(true);
  const subs = [];

  useEffect(() => {
    // Define an async function to fetch and subscribe to hero data
    const fetchData = async () => {
      const db = await Database.get();

      const sub = db.heroes.find({
        selector: {},
        sort: [
          { name: 'asc' }
        ]
      }).$.subscribe(heroes => {
        if (!heroes) {
          return;
        }
        console.log('reload heroes-list ');
        console.dir(heroes);
        setHeroes(heroes);
        setLoading(false);
      });
      subs.push(sub);
    };

    fetchData();

    // Unsubscribe from subscriptions when the component unmounts
    return () => {
      subs.forEach(sub => sub.unsubscribe());
    };
  }, []);

  const deleteHero = async (hero) => {
    console.log('delete hero:');
    console.dir(hero);
    await hero.remove();
  }

  const editHero = async (hero) => {
    console.log('edit hero:');
    console.dir(hero);
  }

  return (
    <div id="list-box" className="box">
      <h3>Data</h3>
      {loading && <span>Loading...</span>}
      {!loading && heroes.length === 0 && <span>No Data</span>}
      {!loading &&
        <ul id="heroes-list">
          {heroes.map(hero => {
            return (
              <li key={hero.name}>
                <div className='actions'>
                  <div className="color-box" style={{
                    background: hero.color
                  }}>{hero.color}</div>
                  <span className="name">
                    {hero.name}
                  </span>
                  <div className="">
                    {/* <i className="fa fa-pencil-square-o" aria-hidden="true" onClick={() => editHero(hero)}></i> */}
                    <span className="delete fa fa-trash-o" aria-hidden="true" onClick={() => deleteHero(hero)}>DELETE</span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      }
    </div>
  );
}

export default HeroList;
