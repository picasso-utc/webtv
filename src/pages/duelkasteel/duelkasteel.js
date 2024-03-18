import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { ajaxPost } from "../../utils/Ajax";
import { asset_url } from "../../utils/Config";
import Grid from "@material-ui/core/Grid";
import { Typography, Box } from "@material-ui/core";

import "./duelkasteel.css";

class DuelKasteel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drinks: [
        {
          id: 20486,
          title: "Kasteel Rubus",
          total: 0,
          team: "right",
        },
        {
          id: 14821,
          title: "Kasteel Rouge",
          total: 0,
          team: "left",
        },
      ],
      attackQueue: [],
      attacking: false,
      animationUrl: "images/duelkasteel/idle.gif",
      selected: "",
      leftHealth: 342,
      rightHealth: 342,
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
  }
  sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  async handleAttack() {
    if (this.state.attacking) return;
    if (this.state.attackQueue.length <= 0) return;
    if (this.state.leftHealth <= 0) {
      this.setState({ leftHealth: 342 });
      this.setState({ rightHealth: 342 });
      return;
    }
    if (this.state.rightHealth <= 0) {
      this.setState({ leftHealth: 342 });
      this.setState({ rightHealth: 342 });
      return;
    }
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
      selected: item.title,
    });

    await this.playAttackAnimation(item.team);

    this.handleAttack();
  }

  async playAttackAnimation(side) {
    if (side == "left")
      this.state.animationUrl = asset_url("/images/duelkasteel/lefthit.gif");
    if (side == "right")
      this.state.animationUrl = asset_url("/images/duelkasteel/righthit.gif");

    // HEALTH
    if (side === "left")
      this.setState({
        rightHealth: this.state.rightHealth - 1,
      });
    if (side === "right")
      this.setState({
        leftHealth: this.state.leftHealth - 1,
      });

    await this.sleep(2375);

    // UNLOCK
    this.setState({
      attacking: false,
      selected: "",
      animationUrl: asset_url("/images/duelkasteel/idle.gif"),
    });

    return new Promise((resolve) => {});
  }

  loadDrinks() {
    ajaxPost("payutc/public/drinks/sells", { drinks: this.state.drinks }).then(
      (res) => {
        for (let i = 0; i < this.state.drinks.length; i++) {
          const delta = res.data.drinks[i].total - this.state.drinks[i].total;

          for (let j = 0; j < delta; j++)
            this.state.attackQueue.push({
              title: this.state.drinks[i].title,
              team: this.state.drinks[i].team,
            });
        }

        this.setState({
          drinks: res.data.drinks,
        });
      },
    );
  }

  render() {
    const { classes } = this.props;
    const { drinks, attackQueue } = this.state;
    const listItems = attackQueue.map((d) => <li>{d.team}</li>);
    const animationUrl = this.state.animationUrl;

    return (
      <Box className={classes.root}>
        <div className="HUD">
          <img src={asset_url("/images/duelkasteel/HUD.png")} class="hud"></img>
          <div
            className={`hp-rectangle ${classes.rectangleLeftBorder}`}
            style={{ width: 342 }}
          ></div>
          <div
            className={`hp-rectangle ${classes.rectangleLeft}`}
            style={{ width: this.state.leftHealth }}
          ></div>
          <div
            className={`hp-rectangle ${classes.rectangleRightBorder}`}
            style={{ width: 342 }}
          ></div>
          <div
            className={`hp-rectangle ${classes.rectangleRight}`}
            style={{ width: this.state.rightHealth }}
          ></div>
        </div>
        <div className="fight">
          <img
            className="attack"
            src={this.state.animationUrl}
            alt="attack"
          ></img>
        </div>
        <br></br>
        <div className="left">
          <p class="scoreText">
            {drinks
              .filter((e) => e.team === "left")
              .map((e) => e.total)
              .reduce((a, b) => a + b)}
            x
          </p>
        </div>
        <div className="right">
          <p class="scoreText">
            x
            {drinks
              .filter((e) => e.team === "right")
              .map((e) => e.total)
              .reduce((a, b) => a + b)}
          </p>
        </div>
      </Box>
    );
  }
}

const styles = (theme) => ({
  root: {
    height: "100vh",
    width: "100vw",
    backgroundColor: "black",
    backgroundPosition: "center",
    backgroundSize: "contain",
    backgroundOpacity: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  animationUrl: {
    size: "50%",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(73,20,62,0.5)",
    zIndex: 1,
  },
  video: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "90%",
    height: "90%",
    objectFit: "cover",
  },
  text: {
    color: "#fff",
    zIndex: 2,
  },
  rectangleLeft: {
    position: "absolute",
    left: "0px",
    top: "300px",
    height: "38px",
    background: "#ff016b",
    border: "solid white",
  },
  rectangleLeftBorder: {
    position: "absolute",
    left: "0px",
    top: "300px",
    height: "38px",
    background: "rgba(255,1,107,0)",
    border: "solid white",
    index: "1",
  },
  rectangleRight: {
    position: "absolute",
    right: "0px",
    top: "300px",
    height: "38px",
    background: "#aa01ff",
    border: "solid white",
  },
  rectangleRightBorder: {
    position: "absolute",
    right: "0px",
    top: "300px",
    height: "38px",
    background: "rgba(255,1,107,0)",
    border: "solid white",
    index: "1",
  },
});

export default withStyles(styles)(DuelKasteel);
