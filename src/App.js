// @flow
import React, {Component} from 'react';
import RepoList from './RepoList';
import RepoDetails from './RepoDetails';
import type {State} from './state';

type Props = {};
class App extends Component<Props, State> {
  state = {
    searchValue: '',
    notFoundValue: '',
    repoListContainer: [],
    detailsContainer: {},
    isFetchError: false,
    repoListIsLoading: false,
    detailIsLoading: false,
    selectedIndex: 0,
  };

  _onKeyDown = async(event: Object) => {
    let {repoListContainer, selectedIndex} = this.state;
    let numberOfrepos = repoListContainer.length - 1;
    switch (event.key) {
      case 'ArrowUp':
        if (selectedIndex > 0) {
          this.setState({selectedIndex: selectedIndex - 1});
        } else {
          this.setState({selectedIndex: selectedIndex});
        }
        break;
      case 'ArrowDown':
        if (selectedIndex < numberOfrepos) {
          this.setState({selectedIndex: selectedIndex + 1});
        } else {
          this.setState({selectedIndex: selectedIndex});
        }
        break;
      case 'Enter':
        let selectedID = repoListContainer[selectedIndex].id;
        this.setState({detailIsLoading: true});
        let _delay = new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, 2000);
        });

        _delay.then(async() => {
          let response = await fetch(
            `https://jsonplaceholder.typicode.com/users/${selectedID}`,
          );
          let detailsContainer = await response.json();
          this.setState({detailsContainer: detailsContainer});
          this.setState({detailIsLoading: false});
        });

        break;
      default:
    }
  };
  componentDidMount() {
    let el = document.getElementById('nameList');
    if (el) {
      el.addEventListener('keydown', this._onKeyDown);
    }
  }

  componentWillUnmount() {
    let el = document.getElementById('nameList');
    if (el) {
      el.removeEventListener('keydown', this._onKeyDown);
    }
  }
  render() {
    let {
      searchValue,
      repoListContainer,
      isFetchError,
      selectedIndex,
      repoListIsLoading,
      detailsContainer,
      notFoundValue,
      detailIsLoading,
    } = this.state;

    let onSearchChange = (event) => {
      this.setState({searchValue: event.target.value});
    };
    let inputBoxKeyPress = async(key) => {
      if (key.charCode === 13 && searchValue !== '') {
        // fetch
        console.log('enter');
        this.setState({repoListIsLoading: true});
        console.log('setelah set loading true');

        let _delay = new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, 2000);
        });
        _delay.then(async() => {
          let response = await fetch(
            `https://jsonplaceholder.typicode.com/${searchValue}`,
          );

          if (response.ok) {
            let repoList = await response.json();

            this.setState({notFoundValue: ''});
            this.setState({isFetchError: false});
            this.setState({repoListIsLoading: false});
            this.setState({repoListContainer: repoList, isFetchError: false});
            let inputBox = document.getElementById('inputBox');
            let nameList = document.getElementById('nameList');
            if (inputBox && nameList) {
              inputBox.blur();
              nameList.focus();
            }
          } else {
            this.setState({notFoundValue: searchValue});
            this.setState({isFetchError: true});
            this.setState({repoListIsLoading: false});
            this.setState({repoListContainer: []});
            this.setState({detailsContainer: {}});

            throw new Error(
              `https://jsonplaceholder.typicode.com/${searchValue} is not exist`,
            );
          }
        });
      }
    };

    return (
      <div>
        <input
          id="inputBox"
          type="text"
          palceholder="search..."
          onChange={onSearchChange}
          value={searchValue}
          onKeyPress={inputBoxKeyPress}
        />

        {/* ########################## RepoList section ######################## */}
        {isFetchError ? (
          // if error!!
          repoListIsLoading ? (
            <div>
              <img width="20%" src={'./gif/loading.gif'} />
              <div>Loading ....</div>
            </div>
          ) : (
            <div>{`${notFoundValue} Is Not Found `}</div>
          )
        ) : // if not error!!
          repoListIsLoading ? (
            <div>
              <img width="20%" src={'./gif/loading.gif'} />
              <div>Loading ....</div>
            </div>
          ) : (
            <div tabIndex="0" style={{outline: 'none'}} id="nameList">
              <ol style={{padding: '0'}}>
                {repoListContainer.map((repoData, index) => (
                  <RepoList
                    key={index}
                    repoData={repoData}
                    isSelected={index === selectedIndex}
                    isLoading={repoListIsLoading}
                  />
                ))}
              </ol>
            </div>
          )}
        {/* ########################## Detail section ######################## */}
        {detailsContainer.hasOwnProperty('id') ? (
          detailIsLoading ? (
            <div>
              <img width="20%" src={'./gif/loading.gif'} />
              <div>Loading ....</div>
            </div>
          ) : (
            <RepoDetails repoData={detailsContainer} />
          )
        ) : detailIsLoading ? (
          <div>
            <img width="20%" src={'./gif/loading.gif'} />
            <div>Loading ....</div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default App;
