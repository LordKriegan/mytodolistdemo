import React, { Component } from "react";
import axios from 'axios';
import Card from '../../components/Card/Card';

class Task extends Component {
    state = {
        name: "",
        description: "",
        completed: false
    }

    //on change update state
    onChangeHandler = (e) => {
        const { name } = e.target;
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        this.setState({
            [name]: value
        })
    }

    //post new task to server
    handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("/api/task", {
                name: this.state.name,
                description: this.state.description,
            })
            .then((response) => {
                console.log(response);
                this.props.history.push("/");
            })
            .catch((err) => {
                console.error(err.message);
                console.error("could not retrieve task!");
                this.props.history.push("/");
            })
    }
    //render form inside Card component
    render() {
        return (
            <div className="row">
                <div className="col-sm-10 offset-sm-1">
                    <Card title="New Task">
                        <form>
                            <div className="form-group">
                                <label htmlFor="taskname">Task Name</label>
                                <input type="input" name="name" value={this.state.name} onChange={this.onChangeHandler} className="form-control" id="taskname" placeholder="Task Name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlTextarea1">Task Description</label>
                                <textarea name="description" value={this.state.description} onChange={this.onChangeHandler} className="form-control" id="exampleFormControlTextarea1" rows="5"></textarea>
                            </div>
                            <button onClick={this.handleSubmit} type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </Card>
                </div>
            </div>
        )
    }
}

export default Task;