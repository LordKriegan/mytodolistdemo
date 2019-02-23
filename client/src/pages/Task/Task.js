import React, { Component } from "react";
import axios from 'axios';
import Card from '../../components/Card/Card';

class Task extends Component {
    state = {
        name: "",
        description: "",
        completed: ""
    }
    //on change update state
    onChangeHandler = (e) => {
        const { name } = e.target;
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        this.setState({
            [name]: value
        })
    }
    //update task on server
    handleSubmit = (e) => {
        e.preventDefault();
        axios
            .put("/api/task", {
                id: this.props.match.params.id,
                name: this.state.name,
                description: this.state.description,
                completed: this.state.completed
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
    //delete task from server
    handleDelete = (e) => {
        e.preventDefault();
        axios
            .delete("/api/task/" + this.props.match.params.id)
            .then((response) => {
                console.log(response);
                this.props.history.push("/");
            })
            .catch((err) => {
                console.error(err.message);
                console.error("could not delete task!");
                this.props.history.push("/");
            })
    }
    //on component mount, update state so that user sees task data
    componentDidMount() {
        axios
            .get("/api/task/" + this.props.match.params.id)
            .then((response) => {
                this.setState({
                    name: response.data.name,
                    description: response.data.description,
                    completed: response.data.completed
                })
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
                    <Card title="Edit Task">
                        <form>
                            <div className="form-group">
                                <label htmlFor="taskname">Task Name</label>
                                <input type="input" name="name" value={this.state.name} onChange={this.onChangeHandler} className="form-control" id="taskname" placeholder="Task Name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlTextarea1">Task Description</label>
                                <textarea name="description" value={this.state.description} onChange={this.onChangeHandler} className="form-control" id="exampleFormControlTextarea1" rows="5"></textarea>
                            </div>
                            <div className="form-check">
                                <input name="completed" checked={this.state.completed} onChange={this.onChangeHandler} type="checkbox" className="form-check-input" id="exampleCheck1" />
                                <label className="form-check-label" htmlFor="exampleCheck1">Task Completed?</label>
                            </div>
                            <button onClick={this.handleSubmit} type="submit" className="btn btn-primary">Submit</button>
                            <button onClick={this.handleDelete} className="btn btn-danger">Delete</button>
                        </form>
                    </Card>
                </div>
            </div>
        )
    }
}

export default Task;