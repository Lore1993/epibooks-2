import { Component } from "react";

class CommentArea extends Component {
  state = {
    comments: [],
   
  };

  componentDidMount() {
    this.fetchComments();
  }



  fetchComments = () => {
    fetch(
      "https://striveschool-api.herokuapp.com/api/comments/" + this.props.elementId,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkZTIxZWY0YmQ0NzAwMTU4NWIyYWUiLCJpYXQiOjE3NjM2NDc1NjMsImV4cCI6MTc2NDg1NzE2M30.JKJ9nMZVTpsW4sF_160eoL5QzvI7aaB0AYV77h560bQ",
        },
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Errore HTTP: " + res.status);
        }
        return res.json();
      })
      .then((data) => {
        this.setState({ comments: data });
      })
      .catch((err) => {
        console.log("Errore nel fetch", err);
        this.setState({ error: err.message });
      });
  };

  render () {
    return (
        <div className="mt-3">
            <h5>Recensioni</h5>
            {this.state.error && <div>Errore: {this.state.error} </div>}
            {this.state.comments.map((C) =>(
                <div key={C.elementId}>
                    <p>{C.rate}</p>
                    <p>{C.comment}</p>
                </div>
            )
        )}
        </div>
    )
  }
}

export default CommentArea;
