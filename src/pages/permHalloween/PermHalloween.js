import React from "react";
import { Box, styled } from "@mui/material";
import { ajaxPost } from "../../utils/Ajax";
import { asset_url } from "../../utils/Config";
import "./PermHalloween.css";

// Styled components
const StyledRoot = styled(Box)({
  height: "100vh",
  width: "100vw",
  backgroundImage: "url(./images/spooky-halloween-background.png)",
  backgroundColor: "black",
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundOpacity: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
});

const StyledOverlay = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: 1,
});

const StyledVideo = styled('video')({
  position: "absolute",
  top: 0,
  left: 0,
  width: "90%",
  height: "90%",
  objectFit: "cover",
});

const StyledText = styled(Box)({
  color: "#fff",
  zIndex: 2,
});

const StyledRectangle = styled('div')({
  background: "#01FF36",
  marginTop: 0,
});

class PermHalloween extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drinks: [
        {
          id: 14821,
          title: "kasteel",
          total: 0,
        },
        {
          id: 3679,
          title: "Pampryl",
          total: 0,
        },
        {
          id: 20145,
          title: "TDM",
          total: 0,
        },
        {
          id: 457,
          title: "cuvee",
          total: 0,
        },
        {
          id: 458,
          title: "delirium",
          total: 0,
        },
        {
          id: 17835,
          title: "mordue",
          total: 0,
        },
        {
          id: 19778,
          title: "Tarot",
          total: 0,
        },
        {
          id: 16614,
          title: "Chouffe",
          total: 0,
        },
      ],
      displayedCounter: [
        {
          id: 14821,
          title: "kasteel",
          total: 0,
        },
        {
          id: 3679,
          title: "Pampryl",
          total: 0,
        },
        {
          id: 20145,
          title: "TDM",
          total: 0,
        },
        {
          id: 457,
          title: "cuvee",
          total: 0,
        },
        {
          id: 458,
          title: "delirium",
          total: 0,
        },
        {
          id: 17835,
          title: "mordue",
          total: 0,
        },
        {
          id: 20,
          title: "Tarot",
          total: 0,
        },
        {
          id: 16614,
          title: "Chouffe",
          total: 0,
        },
      ],
      attackQueue: [],
      attacking: false,
      animationUrl: "images/idle.gif",
      selected: 0,
      health: 1000,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    // Typical usage (don't forget to compare props):
    if (prevState.attackQueue !== this.attackQueue) {
      this.handleAttack();
    }
  }

  componentDidMount() {
    this.loadDrinks();
    setInterval(() => this.loadDrinks(), 10 * 1000);
    setInterval(() => this.changeSelected(), 1000 * 300);
  }

  sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  async handleAttack() {
    if (this.state.attacking) return;
    if (this.state.attackQueue.length <= 0) return;
    // LOCK
    this.setState({
      attacking: true,
    });

    // RETRIEVE AND UPDATE
    let tempAttackQueue = this.state.attackQueue;

    const item = tempAttackQueue.splice(
        Math.floor(Math.random() * tempAttackQueue.length),
        1,
    )[0];

    this.setState({
      attackQueue: tempAttackQueue,
    });

    await this.playAttackAnimation(item.team);

    this.handleAttack();
  }

  async playAttackAnimation(side) {
    this.state.animationUrl = asset_url("/images/left_hit.gif");

    // HEALTH
    this.setState({
      health: this.state.health - 5,
    });

    await this.sleep(700);

    // UNLOCK
    this.setState({
      attacking: false,
      animationUrl: asset_url("/images/idle.gif"),
    });

    return new Promise((resolve) => {});
  }

  loadDrinks() {
    ajaxPost("payutc/public/drinks/sells", { drinks: this.state.drinks }).then(
        (res) => {
          const delta =
              res.data.drinks[this.state.selected].total -
              this.state.drinks[this.state.selected].total;
          for (let j = 0; j < delta; j++)
            this.state.attackQueue.push({
              title: this.state.drinks[this.state.selected].title,
              team: this.state.drinks[this.state.selected].team,
            });
          // 1. Make a shallow copy of the items
          let displayedCounter = [...this.state.displayedCounter];
          // 2. Make a shallow copy of the item you want to mutate
          let counterActive = { ...displayedCounter[this.state.selected] };
          // 3. Replace the property you're intested in
          counterActive.total += delta;
          // 4. Put it back into our array. N.B. we *are* mutating the array here,
          //    but that's why we made a copy first
          displayedCounter[this.state.selected] = counterActive;
          // 5. Set the state to our new copy
          this.setState({ displayedCounter: displayedCounter });
          this.setState({
            drinks: res.data.drinks,
          });
        },
    );
  }

  changeSelected() {
    this.setState({
      selected: (this.state.selected + 1) % 8,
    });
  }

  render() {
    const { drinks, attackQueue } = this.state;
    const listItems = attackQueue.map((d) => <li>{d.team}</li>);
    const animationUrl = this.state.animationUrl;

    return (
        <StyledRoot>
          <div className="top_info">
            <img
                src={asset_url("images/teddy_mechant.jpg")}
                alt="teddy_mechant_logo"
                className="logo_teddy"
            />
            <div className="HUD_halloween">
              <StyledRectangle
                  className="hp-rectangle"
                  style={{ width: `${(100 * this.state.health) / 1000}%` }}
              />
            </div>
          </div>
          <div className="fight">
            <img
                className="attack"
                src={this.state.animationUrl}
                alt="attack"
            />
          </div>
          <br />
          <div className="left">
            <div className="beer_wrapper">
              <img
                  className={`beer_img delirium ${
                      this.state.drinks[this.state.selected].title === "delirium"
                          ? "beer_img-selected"
                          : ""
                  }`}
                  src={asset_url("/images/delirium.jpg")}
                  alt="delirium"
                  style={{ aspectRatio: 1 }}
              />
              <p className="beer_label">
                x
                {
                  this.state.displayedCounter.filter(
                      (element) => element.title === "delirium",
                  )[0].total
                }
              </p>
            </div>
            <div className="beer_wrapper">
              <img
                  className={`beer_img delirium ${
                      this.state.drinks[this.state.selected].title === "cuvee"
                          ? "beer_img-selected"
                          : ""
                  }`}
                  src={asset_url("/images/cuvee_logo.png")}
                  alt="cuvée"
                  style={{ aspectRatio: 1 }}
              />
              <p className="beer_label">
                x
                {
                  this.state.displayedCounter.filter(
                      (element) => element.title === "cuvee",
                  )[0].total
                }
              </p>
            </div>
            <div className="beer_wrapper">
              <img
                  className={`beer_img delirium ${
                      this.state.drinks[this.state.selected].title === "mordue"
                          ? "beer_img-selected"
                          : ""
                  }`}
                  src={asset_url("/images/mordue_logo.jpeg")}
                  alt="mordue"
                  style={{ aspectRatio: 1 }}
              />
              <p className="beer_label">
                x
                {
                  this.state.displayedCounter.filter(
                      (element) => element.title === "mordue",
                  )[0].total
                }
              </p>
            </div>
            <div className="beer_wrapper">
              <img
                  className={`beer_img delirium ${
                      this.state.drinks[this.state.selected].title === "Chouffe"
                          ? "beer_img-selected"
                          : ""
                  }`}
                  src={asset_url("/images/chouffe_logo.jpeg")}
                  alt="Chouffe"
                  style={{ aspectRatio: 1 }}
              />
              <p className="beer_label">
                x
                {
                  this.state.displayedCounter.filter(
                      (element) => element.title === "Chouffe",
                  )[0].total
                }
              </p>
            </div>
          </div>
          <div className="right">
            <div className="beer_wrapper">
              <p className="beer_label">
                x
                {
                  this.state.displayedCounter.filter(
                      (element) => element.title === "kasteel",
                  )[0].total
                }
              </p>
              <img
                  className={`beer_img delirium ${
                      this.state.drinks[this.state.selected].title === "kasteel"
                          ? "beer_img-selected"
                          : ""
                  }`}
                  src={asset_url("/images/kasteel.jpeg")}
                  alt="right"
                  style={{ aspectRatio: 1 }}
              />
            </div>
            <div className="beer_wrapper">
              <p className="beer_label">
                x
                {
                  this.state.displayedCounter.filter(
                      (element) => element.title === "Pampryl",
                  )[0].total
                }
              </p>
              <img
                  className={`beer_img delirium ${
                      this.state.drinks[this.state.selected].title === "Pampryl"
                          ? "beer_img-selected"
                          : ""
                  }`}
                  src={asset_url("/images/pampryl_logo.png")}
                  alt="Pampryl"
                  style={{ aspectRatio: 1 }}
              />
            </div>
            <div className="beer_wrapper">
              <p className="beer_label">
                x
                {
                  this.state.displayedCounter.filter(
                      (element) => element.title === "TDM",
                  )[0].total
                }
              </p>
              <img
                  className={`beer_img delirium ${
                      this.state.drinks[this.state.selected].title === "TDM"
                          ? "beer_img-selected"
                          : ""
                  }`}
                  src={asset_url("/images/TDM_logo.jpeg")}
                  alt="TDM"
                  style={{ aspectRatio: 1 }}
              />
            </div>
            <div className="beer_wrapper">
              <p className="beer_label">
                x
                {
                  this.state.displayedCounter.filter(
                      (element) => element.title === "Tarot",
                  )[0].total
                }
              </p>
              <img
                  className={`beer_img delirium ${
                      this.state.drinks[this.state.selected].title === "Tarot"
                          ? "beer_img-selected"
                          : ""
                  }`}
                  src={asset_url("/images/tarot.jpeg")}
                  alt="Tarot"
                  style={{ aspectRatio: 1 }}
              />
            </div>
          </div>
          <div id="footer">
            <p>NUMERO STOP VSS : 0658358728</p>
          </div>
        </StyledRoot>
    );
  }
}

export default PermHalloween;