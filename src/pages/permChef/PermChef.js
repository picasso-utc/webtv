import React, { useState, useEffect } from "react";
import { ajaxPost } from "../../utils/Ajax";
import Grid from "@material-ui/core/Grid";
import ClanBar from "../../components/permChef/ClanBar";
import logoHarpona from "../../assets/permChef/harpona.png";
import logoOrphies from "../../assets/permChef/orphies.png";
import logoEnemagoy from "../../assets/permChef/enemagoy.png";
import logoVurion from "../../assets/permChef/vurion.png";
import logoDuri from "../../assets/permChef/logoDuri.jpg";
import logoDagul from "../../assets/permChef/logoDagul.jpg";
import "./permChef.css";

const PermChef = () => {
  const [beers, setBeers] = useState(
    [
      {
        id: 19778,
        title: "Tarot d’or",
        total: 0,
      },
      {
        id: 14821,
        title: "Kasteel Rouge",
        total: 0,
      },
      {
        id: 457,
        title: "Cuvée des Trolls",
        total: 0,
      },
      {
        id: 17835,
        title: "Cidre La Mordue",
        total: 0,
      },
      {
        id: 19824,
        title: "Delirium",
        total: 0,
      },
      {
        id: 12492,
        title: "Valdieu",
        total: 0,
      },
    ],
    /*orphi: {
      kastel: {
        id: 17152,
        quantity: 0,
      },
    },
    enema: {
      valdieu: {
        id: 12492,
        quantity: 0,
      },
    },
    harpo: {
      tarotDor: {
        id: 19778,
        quantity: 0,
      },
    },
    vurion: {
      cidre: {
        id: 17835,
        quantity: 0,
      },
    },
    duri: {
      delirium: {
        id: 19824,
        quantity: 0,
      },
    },
    dagul: {
      cuvee: {
        id: 457,
        quantity: 0,
      },
    },*/
  );

  const [maxPoints, setMaxPoints] = useState(1);

  const loadBeerSells = () => {
    ajaxPost("payutc/public/drinks/sells", { drinks: beers }).then((res) => {
      console.log(res.data);
      setBeers(res.data.drinks);
    });
  };

  useEffect(() => {
    setMaxPoints(Math.max(...beers.map((obj) => obj.total), 1));
  }, [beers]);

  useEffect(() => {
    loadBeerSells();
    const interval = setInterval(() => {
      loadBeerSells();
    }, 15 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Grid class="chefMainContainer">
      <div className="chefBlurEffect">
        <div className="chefHeader">PERM CHEFS</div>
        <div className="chefBars">
          <ClanBar
            logo={logoDuri}
            color="#ffffff"
            points={beers?.find((x) => x.id == 19824)?.total * 1000}
            maxPoints={maxPoints * 1000}
          />
          <ClanBar
            logo={logoEnemagoy}
            color="#821A89"
            points={beers?.find((x) => x.id == 12492)?.total * 1000}
            maxPoints={maxPoints * 1000}
          />
          <ClanBar
            logo={logoVurion}
            color="#003366"
            points={beers?.find((x) => x.id == 17835)?.total * 1000}
            maxPoints={maxPoints * 1000}
          />
          <ClanBar
            logo={logoOrphies}
            color="#AC3C13"
            points={beers?.find((x) => x.id == 14821)?.total * 1000}
            maxPoints={maxPoints * 1000}
          />
          <ClanBar
            logo={logoHarpona}
            color="#FFD700"
            points={beers?.find((x) => x.id == 19778)?.total * 1000}
            maxPoints={maxPoints * 1000}
          />
          <ClanBar
            logo={logoDagul}
            color="#000000"
            points={beers?.find((x) => x.id == 457)?.total * 1000}
            maxPoints={maxPoints * 1000}
          />
        </div>
      </div>
    </Grid>
  );
};

export default PermChef;
