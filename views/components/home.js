const e = React.createElement;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }

    return e('div', null, 'Hello there!');
  }
}

const domContainer = document.querySelector('#homepage_container');
ReactDOM.render(e(Home), domContainer);
