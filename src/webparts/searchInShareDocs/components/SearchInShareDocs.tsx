import * as React from 'react';
import styles from './SearchInShareDocs.module.scss';
import { ISearchInShareDocsProps } from './ISearchInShareDocsProps';
import {TextField} from 'office-ui-fabric-react/lib/TextField';
import {PrimaryButton} from 'office-ui-fabric-react/lib/Button';

export interface IStates {
  Search: any;
  Selected: any;
}

export default class SearchInShareDocs extends React.Component<ISearchInShareDocsProps, 
IStates> {
    constructor(props: any) {
      super(props);
      this.state = {
          Search: "",
          Selected: ""
      }

      this.saveInput = this.saveInput.bind(this);
      this.saveSelected = this.saveSelected.bind(this);
      this.search = this.search.bind(this);
      this.ifEnter = this.ifEnter.bind(this);
  }

  public saveInput(e: any) {
    let state : any = {}
    state["Search"] = e.target.value;
    this.setState(state);
  }

  public saveSelected(e: any) {
    let state : any = {}
    state["Selected"] = e.target.value;
    this.setState(state);
  }

  public ifEnter(e: any) {
    if(e.key == 'Enter') {
      e.preventDefault();
      this.search();
    }
  }

  private async search() {
    if(this.state.Search == "") {
        alert("You need to enter text in searchbar to be able to search");
    } else {
        window.open("http://app02.borgwarner.com/ShareDocs/Search/Pages/Docs.aspx?k=" + this.state.Selected + ":" + this.state.Search + "&s=ShareDocs");
        this.clear();
    }
  }

  private async clear() {
    let state : any = {}
    state["Search"] = "";
    state["Selected"] = "";
    this.setState(state);
  }

  public render(): React.ReactElement<ISearchInShareDocsProps> {
    return(
      <div>
          <form onSubmit={(e) => this.search()}>
              <fieldset className={styles.searchForm}>
                  <legend>Search in ShareDocs</legend>
                  <div>
                      <div className={styles.gridcontainer}>
                          <TextField
                              value={this.state.Search}
                              id="Search"
                              placeholder='Enter free text or filter search'
                              onChange={(e) => this.saveInput(e)}
                              onKeyUp={(e) => this.ifEnter(e)}
                          />
                          <select onChange={(e) => this.saveSelected(e)} className={styles.dropdown}>
                              <option value="" selected>No Filter</option>
                              <option id="Author" value="Author">Author</option>
                              <option id="Company" value="Company">Company</option>
                              <option id="Customer" value="Customer">Customer</option>
                              <option id="DlcDocId" value="DlcDocId">Document ID</option>
                              <option id="FileName" value="FileName">File Name</option>
                              <option id="IssuedBy" value="IssuedBy">Issued By</option>
                              <option id="Project" value="Project">Project</option>
                              <option id="Supplier" value="Supplier">Supplier</option>
                              <option id="Title" value="Title">Title</option>
                          </select>
                      </div>
                      <PrimaryButton className={styles.searchBtn} onClick={(e) => this.search()}>
                          <img src={require('../assets/searchIcon.png')} alt="search icon" className={styles.icon} />
                          Search in ShareDocs
                      </PrimaryButton>
                  </div>
              </fieldset>
          </form>
      </div>
    );
  }
}
