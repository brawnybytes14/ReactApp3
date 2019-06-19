import { resolve } from "dns";
import { rejects } from "assert";

class CommentBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };
    }

    loadCommentsFromServer() {
        return new Promise((resolve, rejects) => {
            const xhr = new XMLHttpRequest();
            xhr.open('get', this.props.url, true);
            xhr.onload = () => {
                //debugger;
                const data = JSON.parse(xhr.responseText);
                this.state.data = data;
                resolve(data);
                //this.setState({ data: data });
                console.log("", this.state.data);

            };
            xhr.send();
        });
        
       

    }
    componentDidMount() {
        this.loadCommentsFromServer().then(data => {
            this.state.data = data;
        }).catch(err => {
            console.log(err);
        })
        //window.setInterval(
        //    () => ,
        //    this.props.pollInterval,
        //);
    }

    render() {
        debugger;
        test = this.state.data;
        return (
           
            <div className="commentBox">
                <h1>Comments</h1>
                <h1>{test}</h1>
                <CommentList data={this.state.data} />
                <CommentForm />
            </div>
        );
    }
}

class CommentList extends React.Component {
   
    render() {
      
        const commentNodes = this.props.data.map( comment => (
            <Comment author={comment.Author} key={comment.Id}>
                {comment.Text}
            </Comment>
        ));
        return <div className="commentList">{commentNodes}</div>;
    }
}

class CommentForm extends React.Component {
    render() {
        return (
            <div className="commentForm">Hello, world! I am a CommentForm.</div>
        );
    }
}

class Comment extends React.Component {
    render() {
       const md = new Remarkable()
        return (
            <div className="comment">
                <h2 className="commentAuthor">{this.props.author}</h2>
                {this.props.children}
            </div>
        );
    }
}


ReactDOM.render(
    <CommentBox url="/comments" pollInterval={2000} />,
    document.getElementById('content'),
);