import React from "react";
import Swal from "sweetalert2";

export class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dots: [
        { id: 1, value: "" },
        { id: 2, value: "" },
        { id: 3, value: "" },
        { id: 4, value: "" },
        { id: 5, value: "" },
        { id: 6, value: "" },
        { id: 7, value: "" },
        { id: 8, value: "" },
        { id: 9, value: "" }
      ],
      step: 1
    };
  }

  isWin = array => {
    let result = false;
    if (this.in_array([1, 2, 3], array)) {
      result = true;
    } else if (this.in_array([4, 5, 6], array)) {
      result = true;
    } else if (this.in_array([7, 8, 9], array)) {
      result = true;
    } else if (this.in_array([1, 4, 7], array)) {
      result = true;
    } else if (this.in_array([2, 5, 8], array)) {
      result = true;
    } else if (this.in_array([3, 6, 9], array)) {
      result = true;
    } else if (this.in_array([1, 5, 9], array)) {
      result = true;
    } else if (this.in_array([3, 5, 7], array)) {
      result = true;
    } else {
      result = false;
    }

    return result;
  };

  in_array = (first_array, second_array) => {
    let expected_count = first_array.length;
    let count = 0;
    first_array.map(i => {
      second_array.map(j => {
        if (i === j) {
          count++;
        }
        return j;
      });
      return i;
    });

    if (count === expected_count) {
      return true;
    } else {
      return false;
    }
  };

  check = (dots, step) => {
    console.log(dots);
    console.log(step);
    if (step % 2 !== 0) {
      let xids = dots.filter(d => d.value === "x").map(dot => dot.id);
      if (this.isWin(xids)) {
        Swal.fire({
          timer: 2000,
          title: "Player 1 wins",
          icon: "success",
          position: "center",
          showConfirmButton: false
        });
        setTimeout(() => {
          window.location = "/tictac";
        }, 2000);
      } else if (step === 9 && !this.isWin(xids)) {
        Swal.fire({
          timer: 2000,
          title: "Draw",
          icon: "info",
          position: "center",
          showConfirmButton: false
        });
        setTimeout(() => {
          window.location = "/tictac";
        }, 2000);
      }
    } else {
      let oids = dots.filter(d => d.value === "0").map(dot => dot.id);
      if (this.isWin(oids)) {
        Swal.fire({
          timer: 2000,
          title: "Player 2 wins",
          icon: "success",
          position: "center",
          showConfirmButton: false
        });
        setTimeout(() => {
          window.location = "/tictac";
        }, 2000);
      }
    }
  };

  onClick = id => {
    let dots = this.state.dots;
    let step = this.state.step;
    let dot = dots.find(d => d.id === id);
    if (dot && !dot.value) {
      dots = dots.map(d => {
        if (d === dot) {
          if (step % 2 !== 0) {
            d.value = "x";
          } else {
            d.value = "0";
          }
        }
        return d;
      });
      this.check(dots, step);
      step++;
      this.setState({ dots, step });
    } else {
      Swal.fire({
        toast: true,
        timer: 2000,
        title: "Error",
        icon: "error",
        position: "top-right",
        showConfirmButton: false
      });
    }
  };

  render() {
    let { dots } = this.state;

    return (
      <section className="tictac">
        <div className="game-board">
          {dots.map(item => (
            <div
              className="dot-item"
              key={item.id}
              style={{ cursor: item.value ? "none" : "pointer" }}
              onClick={() => this.onClick(item.id)}
            >
              <img alt="" src={`/assets/images/${item.value}.svg`} />
            </div>
          ))}
        </div>
      </section>
    );
  }
}
