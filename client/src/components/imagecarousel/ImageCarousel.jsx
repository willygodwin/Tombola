import React, { Component } from "react";
import "./styles.css";

const IMG_WIDTH = '100%';
const IMG_HEIGHT = '400px';

class ImageCarousel extends Component {
  lastTouch = 0;
  state = {
    // imgs: ["/images/yeezy.jpg", "/images/jimiguitar.png", "/images/diamond.jpg"],
    imgs: this.props.post.image_refs,
    currentIndex: 0,
    movement: 0,
    width: 0
  };


  handleWheel = (e) => {
    clearTimeout(this.wheelTimeout);
    this.handleMovement(e.deltaX);
    this.wheelTimeout = setTimeout(() => this.handleMovementEnd(), 100);
  };

  handleMovement = (delta) => {
    clearTimeout(this.transitionTimeout);

    this.setState((state) => {
      const maxLength = state.imgs.length - 1;

      let nextMovement = state.movement + delta;

      if (nextMovement < 0) {
        nextMovement = 0;
      }

      if (nextMovement > maxLength * state.width) {
        nextMovement = maxLength * state.width;
      }

      return {
        movement: nextMovement,
        transitionDuration: "0s",
      };
    });
  };

  handleTouchStart = (e) => {
    this.lastTouch = e.nativeEvent.touches[0].clientX;
  };

  handleTouchMove = e => {
    const delta = this.lastTouch - e.nativeEvent.touches[0].clientX;
    this.lastTouch = e.nativeEvent.touches[0].clientX;

    this.handleMovement(delta);
  };

  handleTouchEnd = () => {
    this.handleMovementEnd();
    this.lastTouch = 0;
  };

  handleMovementEnd = () => {
    const { movement, currentIndex, width } = this.state;

    const endPosition = movement / width;
    const endPartial = endPosition % 1;
    const endingIndex = endPosition - endPartial;
    const deltaInteger = endingIndex - currentIndex;

    let nextIndex = endingIndex;
    if (deltaInteger >= 0) {
      if (endPartial >= 0.1) {
        nextIndex += 1;
      }
    }
    else if (deltaInteger < 0) {
      nextIndex = currentIndex - Math.abs(deltaInteger);
      if (endPartial > 0.9) {
        nextIndex += 1;
      }
    }

    this.transitionTo(nextIndex, Math.min(0.5, 1 - Math.abs(endPartial)));

  };

  transitionTo = (index, duration) => {
    const { width } = this.state;
    this.setState({
      currentIndex: index,
      movement: index * width,
      transitionDuration: `${duration}s`,
    });

    this.transitionTimeout = setTimeout(() => {
      this.setState({ transitionDuration: "0s" });
    }, duration * 100);
  };

  componentWillUnmount = () => {
    clearTimeout(this.transitionTimeout);
  };

  componentDidMount() {
    const width = this.divElement.clientWidth;
    this.setState({ width });
  }
  render() {
    const { currentIndex, movement, transitionDuration, imgs, width } = this.state;
    const maxLength = imgs.length - 1;
    const maxMovement = maxLength * width;

    return (
      <div className="App">
        <div
          ref={(divElement) => { this.divElement = divElement }}
          className="main"
          style={{
            width: `${IMG_WIDTH}px`,
            height: `${IMG_HEIGHT}px`,
          }}
          onTouchStart={this.handleTouchStart}
          onTouchMove={this.handleTouchMove}
          onTouchEnd={this.handleTouchEnd}
          onWheel={this.handleWheel}
        >
          <div className="swiper"
            style={{
              transform: `translateX(${movement * -1}px)`,
              transitionDuration: transitionDuration,
            }}
          >
            {imgs.map((src, index) => {
              return <img key={index} src={src.location} alt={src.key} style={{ minWidth: '100%' }} height="auto" />;
            })}
          </div>
          {
            movement !== 0 && (
              <button
                className="back move"
                onClick={(event) => {
                  event.preventDefault()
                  event.stopPropagation()

                  this.transitionTo(currentIndex - 1, 0.5);
                }}
              >
                ←
              </button>
            )
          }
          {
            movement !== maxMovement && (
              <button
                className="next move"
                onClick={(event) => {
                  event.preventDefault()
                  event.stopPropagation()
                  this.transitionTo(currentIndex + 1, 0.5);
                }}
              >
                →
              </button>
            )
          }
        </div>
      </div>
    );
  }
}

export default ImageCarousel;
