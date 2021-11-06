import React from "react";
import axios from 'axios';

export default class TODO extends React.Component {

    constructor(props) {
        super(props);
        this.url = 'http://localhost:8000/todo'
        this.checked_url = 'http://localhost:8000/todo_check'
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            newItem: ''
        }
    }

    componentDidMount() {
        axios.get(this.url)
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result.data
                    })
                }, (error) => {
                    this.setState({
                        error,
                        isLoaded: true
                    })
                }
            )
    }

    handleChange(event) {
        this.setState({newItem: event.target.value});
    }


    handleSubmit(event) {
        axios.post(this.url, {newItem: this.state.newItem}).then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    items: result.data,
                    newItem: '',
                })
            }, (error) => {
                this.setState({
                    error,
                    isLoaded: true
                })
            }
        )
        event.preventDefault();
    }

    setChecked(item) {
        axios.post(this.checked_url, {checked: item.id}).then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    items: result.data,
                    newItem: '',
                })
            }, (error) => {
                this.setState({
                    error,
                    isLoaded: true
                })
            }
        )
    }

    render() {
        const {error, items, isLoaded} = this.state;

        let todoBlock = items.map(i => (
            <li key={i.id} className={i.checked ? "checked" : ""} onClick={this.setChecked.bind(this, i).bind(i)}>{i.name}</li>
        ))

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading ...</div>;
        } else {
            return (
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <label>
                        ДОБАВЬ ЭЛЕМЕНТ:
                        <input type="text" value={this.state.newItem} onChange={this.handleChange.bind(this)} required/>
                    </label>
                    <input type="submit" value="Submit"/>
                    <br/>
                    <div>
                        <ul>
                            {todoBlock}
                        </ul>
                    </div>
                </form>
            )
        }

    }
}