import React from "react";

export default class AnimatedNumber extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value
        }

        this.count = this.count.bind(this);
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.rAF);
    }

    componentDidUpdate(prevProps) {
        const { value, duration } = this.props;

        if (value !== prevProps.value || 
            duration !== prevProps.duration) {
            // 시간을 초기화한다
            this.start();
        }
    }

    start() {
        this.startTime = null;

        cancelAnimationFrame(this.rAF);
        this.rAF = requestAnimationFrame(this.count);
    }

    count(timestamp) {
        if (!this.startTime) { this.startTime = timestamp; }
        if (!this.startVal) { this.startVal = this.state.value; }

        const { duration, value } = this.props;
        const endVal = value;
        const startVal = this.startVal;
        const progress = timestamp - this.startTime;

        // 현재 프레임의 값을 얻어온다
        let currentVal = startVal + (endVal - startVal) * (progress / duration);
        if (endVal > startVal) {
            currentVal = Math.min(currentVal, endVal);
        } else {
            currentVal = Math.max(currentVal, endVal);
        }

        // callback 을 호출한다
        this.setState({ value: currentVal });

        if (progress < duration) {
            this.rAF = requestAnimationFrame(this.count);
        } else {
            // onEnd
            this.startVal = currentVal;
        }

    }

    render() {
        const { format } = this.props;
        const { value } = this.state;
        return <span>{format ? format(value) : value}</span>
    }
}