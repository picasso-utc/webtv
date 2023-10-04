import React from "react";
import { Typography, Box } from "@material-ui/core";
import { ajaxPost } from "../../utils/Ajax";
import { asset_url } from "../../utils/Config";
import "./permPicCoule.css";

class PermPicCoule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drinks: [
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
      ],
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.attackQueue !== this.attackQueue) {
      this.handleAttack();
    }
  }

  componentDidMount() {
    this.loadDrinks();
    setInterval(() => this.loadDrinks(), 15 * 1000);
  }

  loadDrinks() {
    ajaxPost("payutc/public/drinks/sells", { drinks: this.state.drinks }).then(
      (res) => {
        console.log(res.data.drinks);
        this.setState({
          drinks: res.data.drinks,
        });
      },
    );
  }

  render() {
    const TarotDOr = this.state.drinks.find((x) => x.id == 19778).total;
    const Kasteel = this.state.drinks.find((x) => x.id == 14821).total;
    const Cuvee = this.state.drinks.find((x) => x.id == 457).total;
    const Mordue = this.state.drinks.find((x) => x.id == 17835).total;

    return (
      <div className="body">
        <div className="compteurDiv">
          <div className="compteurLeftDiv">
            <div
              className="barPAE"
              style={{
                width:
                  Cuvee === 0
                    ? 0
                    : (Cuvee / (Cuvee + Mordue + Kasteel + TarotDOr)) * 75 +
                      "%",
              }}
            >
              {Cuvee === 0 ||
                (Cuvee / (Cuvee + Mordue + Kasteel + TarotDOr) < 0.1 ? null : (
                  <span>
                    {(
                      (Cuvee / (Cuvee + Mordue + Kasteel + TarotDOr)) *
                      100
                    ).toFixed(0)}
                    %
                  </span>
                ))}
            </div>
            <div className="logo_nom">
              <img
                src={asset_url("images/PermPicCoule/PAE.png")}
                alt={"logo PAE"}
              />
              <span>Cuvée</span>
            </div>
          </div>
          <div className="compteurRightDiv">
            <div className="logo_nom">
              <img
                src={asset_url("images/PermPicCoule/PTE.png")}
                alt={"logo PTE"}
              />
              <span>Kasteel</span>
            </div>
            <div
              className="barPTE"
              style={{
                width:
                  Kasteel === 0
                    ? 0
                    : (Kasteel / (Cuvee + Mordue + Kasteel + TarotDOr)) * 75 +
                      "%",
              }}
            >
              {Kasteel === 0 ||
                (Kasteel / (Cuvee + Mordue + Kasteel + TarotDOr) <
                0.1 ? null : (
                  <span>
                    {(
                      (Kasteel / (Cuvee + Mordue + Kasteel + TarotDOr)) *
                      100
                    ).toFixed(0)}
                    %
                  </span>
                ))}
            </div>
          </div>
        </div>
        <div className="centerDiv">
          <span>
            <b>LA BIÈRE LA PLUS CONSOMMÉE FERA GAGNER 20€ AU PÔLE ASSOCIÉ</b>
          </span>
          <span>
            (argent répartit équitablement entre toutes les assos du pôle)
          </span>
        </div>
        <div className="compteurDiv">
          <div className="compteurLeftDiv">
            <div
              className="barPSEC"
              style={{
                width:
                  TarotDOr === 0
                    ? 0
                    : (TarotDOr / (Cuvee + Mordue + Kasteel + TarotDOr)) * 75 +
                      "%",
              }}
            >
              {TarotDOr === 0 ||
                (TarotDOr / (Cuvee + Mordue + Kasteel + TarotDOr) <
                0.1 ? null : (
                  <span>
                    {(
                      (TarotDOr / (Cuvee + Mordue + Kasteel + TarotDOr)) *
                      100
                    ).toFixed(0)}
                    %
                  </span>
                ))}
            </div>
            <div className="logo_nom">
              <img
                src={asset_url("images/PermPicCoule/PSEC.png")}
                alt={"logo PSEC"}
              />
              <span>Tarot D'Or</span>
            </div>
          </div>
          <div className="compteurRightDiv">
            <div className="logo_nom">
              <img
                src={asset_url("images/PermPicCoule/PVDC.png")}
                alt={"logo PVDC"}
              />
              <span>Mordue</span>
            </div>
            <div
              className="barPVDC"
              style={{
                width:
                  Mordue === 0
                    ? 0
                    : (Mordue / (Cuvee + Mordue + Kasteel + TarotDOr)) * 75 +
                      "%",
              }}
            >
              {Mordue === 0 ||
                (Mordue / (Cuvee + Mordue + Kasteel + TarotDOr) < 0.1 ? null : (
                  <span>
                    {(
                      (Mordue / (Cuvee + Mordue + Kasteel + TarotDOr)) *
                      100
                    ).toFixed(0)}
                    %
                  </span>
                ))}
            </div>
          </div>
        </div>
        <div className="footerDiv">
          <span>
            L'ARGENT PROVIENT DE <b>DONS PERSONNELS</b> DES MEMBRES DE LA PERM,
            ET <b>NON PAS DU BDE</b>
          </span>
        </div>
      </div>
    );
  }
}

export default PermPicCoule;
