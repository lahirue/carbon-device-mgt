/*
 * Copyright (c) 2017, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import PropTypes from 'prop-types';
import Chip from 'material-ui/Chip';
import Dropzone from 'react-dropzone';
import React, {Component} from 'react';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import Clear from 'material-ui/svg-icons/content/clear';
import {GridList, GridTile} from 'material-ui/GridList';
import Theme from '../../../theme';

/**
 * The Second step of application create wizard.
 * This contains following components.
 *      * App Title
 *      * Short Description
 *      * Application Description
 *      * Application Visibility
 *      * Application Tags : {Used Material UI Chip component}
 *      * Application Category.
 *      * Platform Specific properties.
 *      * Screenshots
 *      * Banner
 *      * Icon
 *
 * Parent Component: Create
 * Props:
 *      * handleNext : {type: function, Invokes handleNext function in Parent.}
 *      * handlePrev : {type: function, Invokes handlePrev function in Parent}
 *      * setData : {type: function, Invokes setStepData function in Parent}
 *      * removeData : {type: Invokes removeStepData function in Parent}
 * */
class Step2 extends Component {
    constructor() {
        super();
        this.state = {
            tags: [],
            icon: [],
            title: "",
            errors: {},
            banner: [],
            defValue: "",
            category: 0,
            visibility: 0,
            description: "",
            screenshots: [],
            identifier: "",
            shortDescription: ""
        };
        this.scriptId = "application-create-step2";
    }

    componentWillMount() {
        /**
         *Loading the theme files based on the the user-preference.
         */
        Theme.insertThemingScripts(this.scriptId);
    }

    componentWillUnmount() {
        Theme.removeThemingScripts(this.scriptId);
    }

    /**
     * Create a tag on Enter key press and set it to the state.
     * Clears the tags text field.
     * Chip gets two parameters: Key and value.
     * */
    addTags(event) {
        let tags = this.state.tags;
        if (event.charCode === 13) {
            event.preventDefault();
            tags.push({key: Math.floor(Math.random() * 1000), value: event.target.value});
            this.setState({tags, defValue: ""}, console.log(tags));
        }
    }

    /**
     * Set the value for tag.
     * */
    handleTagChange(event) {
        let defaultValue = this.state.defValue;
        defaultValue = event.target.value;
        this.setState({defValue: defaultValue})
    }

    /**
     * Invokes the handleNext function in Create component.
     * */
    handleNext() {
        let fields = [{name: "Title", value: this.state.title},
            {name: "Short Description", value: this.state.shortDescription},
            {name: "Description", value: this.state.description},
            {name: "Banner", value: this.state.banner},
            {name: "Screenshots", value: this.state.screenshots},
            {name: "Identifier", value: this.state.identifier},
            {name: "Icon", value: this.state.icon}];
        this.validate(fields);
    }

    /**
     * Invokes the handlePrev function in Create component.
     * */
    handlePrev() {
        this.props.handlePrev();
    }

    /**
     * Handles Chip delete function.
     * Removes the tag from state.tags
     * */
    handleRequestDelete(key) {
        this.chipData = this.state.tags;
        const chipToDelete = this.chipData.map((chip) => chip.key).indexOf(key);
        this.chipData.splice(chipToDelete, 1);
        this.setState({tags: this.chipData});
    };

    /**
     * Creates Chip array from state.tags.
     * */
    renderChip(data) {
        return (
            <Chip
                key={data.key}
                onRequestDelete={() => this.handleRequestDelete(data.key)}
                className="applicationCreateChip">
                {data.value}
            </Chip>
        );
    }

    onVisibilitySelect(event, index, value) {
        console.log(value);
        let comp = <SelectField> <MenuItem value={0} primaryText="Public"/>
            <MenuItem value={1} primaryText="Roles"/>
            <MenuItem value={2} primaryText="Devices"/> </SelectField>;
        if (value === 1) {
            this.setState({visibilityComponent: comp});
        } else if (value === 2) {

        } else {

        }
    };

    /**
     * Validate the form.
     * */
    validate(fields) {
        let errors = {};
        let errorsPresent = false;
        fields.forEach(function (field) {
            switch (field.name) {
                case 'Title': {
                    if (field.value === "") {
                        errors[field.name] = field.name + " is required!";
                        errorsPresent = true;
                    } else {
                        errorsPresent = false;
                    }
                    break;
                }
                case 'Identifier': {
                    if (field.value === "") {
                        errors[field.name] = field.name + " is required!";
                        errorsPresent = true;
                    } else {
                        errorsPresent = false;
                    }
                    break;
                }
                case 'Short Description': {
                    if (field.value === "") {
                        errors[field.name] = field.name + " is required!";
                        errorsPresent = true;
                    } else {
                        errorsPresent = false;
                    }
                    break;
                }
                case 'Description': {
                    if (field.value === "") {
                        errors[field.name] = field.name + " is required!";
                        errorsPresent = true;
                    } else {
                        errorsPresent = false;
                    }
                    break;
                }
                case 'Banner': {
                    if (field.value.length === 0) {
                        errors[field.name] = field.name + " is required!";
                        errorsPresent = true;
                    } else {
                        errorsPresent = false;
                    }
                    break;
                }
                case 'Icon': {
                    if (field.value.length === 0) {
                        errors[field.name] = field.name + " is required!";
                        errorsPresent = true;
                    } else {
                        errorsPresent = false;
                    }
                    break;
                }
                case 'Screenshots': {
                    if (field.value.length < 3) {
                        errors[field.name] = "3 " + field.name + " are required!";
                        errorsPresent = true;
                    } else {
                        errorsPresent = false;
                    }
                    break;
                }
            }
        });

        if (!errorsPresent) {
            this.setStepData();
        } else {
            this.setState({errors: errors}, console.log(errors));
        }
    }

    /**
     * Creates an object with the current step data and persist in the parent.
     * */
    setStepData() {
        let stepData = {
            icon: this.state.icon,
            name: this.state.name,
            tags: this.state.tags,
            banner: this.state.banner,
            category: this.categories[this.state.category],
            identifier: this.state.identifier,
            screenshots: this.state.screenshots,
            description: this.state.description,
            shortDescription: this.state.shortDescription
        };

        this.props.setData("step2", {step: stepData});
    };

    /**
     * Set text field values to state.
     * */
    onTextFieldChange(event, value) {
        let field = event.target.id;
        switch (field) {
            case "name": {
                this.setState({name: value});
                break;
            }
            case "shortDescription": {
                this.setState({shortDescription: value});
                break;
            }
            case "description": {
                this.setState({description: value});
                break;
            }
            case "identifier": {
                this.setState({identifier: value});
                break;
            }
        }
    };

    /**
     * Removed user uploaded banner.
     * */
    removeBanner(event, d) {
        console.log(event, d);
        this.setState({banner: []});
    };

    /**
     * Removes uploaded icon.
     * */
    removeIcon(event) {
        this.setState({icon: []});
    };

    /**
     * Removes selected screenshot.
     * */
    removeScreenshot(event) {
        console.log(event.target)
    };

    render() {
        console.log(this.state.visibilityComponent);
        return (
            <div className="createStep2Content">
                <div>
                    <div>
                        <TextField
                            id="name"
                            hintText="Enter a name for your application."
                            errorText={this.state.errors["Title"]}
                            floatingLabelText="Name*"
                            floatingLabelFixed={true}
                            onChange={this.onTextFieldChange.bind(this)}
                        />
                        <br/>
                        <TextField
                            id="identifier"
                            hintText="Unique Identifier for Application."
                            errorText={this.state.errors["Identifier"]}
                            floatingLabelText="Identifier*"
                            floatingLabelFixed={true}
                            onChange={this.onTextFieldChange.bind(this)}
                        />
                        <br/>
                        <TextField
                            id="shortDescription"
                            hintText="Enter a short description for your application."
                            errorText={this.state.errors["Short Description"]}
                            floatingLabelText="Short Description*"
                            floatingLabelFixed={true}
                            multiLine={true}
                            rows={2}
                            onChange={this.onTextFieldChange.bind(this)}
                        />
                        <br/>
                        <TextField
                            id="description"
                            errorText={this.state.errors["Description"]}
                            hintText="Enter the description."
                            floatingLabelText="Description*"
                            floatingLabelFixed={true}
                            multiLine={true}
                            rows={4}
                            onChange={this.onTextFieldChange.bind(this)}
                        />
                        <br/>
                        <SelectField
                            floatingLabelText="Visibility*"
                            value={this.state.visibility}
                            floatingLabelFixed={true}
                            onChange={this.onVisibilitySelect.bind(this)}
                        >
                            <MenuItem value={0} primaryText="Public"/>
                            <MenuItem value={1} primaryText="Roles"/>
                            <MenuItem value={2} primaryText="Devices"/>
                        </SelectField>
                        <br/>
                        <TextField
                            id="tags"
                            errorText={this.state.errors["tags"]}
                            hintText="Enter Application tags.."
                            floatingLabelText="Tags*"
                            floatingLabelFixed={true}
                            value={this.state.defValue}
                            onChange={this.handleTagChange.bind(this)}
                            onKeyPress={this.addTags.bind(this)}
                        />
                        <br/>
                        <div style={this.styles.wrapper}>
                            {this.state.tags.map(this.renderChip, this)}
                        </div>
                        <br/>
                        <SelectField
                            floatingLabelText="Category*"
                            value={this.state.category}
                            floatingLabelFixed={true}
                        >
                            <MenuItem value={0} primaryText="Business"/>
                        </SelectField>
                        <br/>
                        {/*Platform Specific Properties.*/}
                        <div className="platformSpecificPropertyDiv">
                            <p className="platformSpecificPropertyP">Platform Specific Properties</p>
                        </div>
                        <br/>
                        <div>
                            <p className="applicationCreateBannerError">{this.state.errors["Banner"]}</p>
                            <p className="applicationCreateBannerTitle">Banner*:</p>
                            <GridList className="applicationCreateGrid" cols={1.1}>
                                {this.state.banner.map((tile) => (
                                    <GridTile
                                        key={Math.floor(Math.random() * 1000)}
                                        title={tile.name}
                                        actionIcon={
                                            <IconButton onClick={this.removeBanner.bind(this)}>
                                                <Clear/>
                                            </IconButton>}>
                                        <img src={tile.preview}/>
                                    </GridTile>
                                ))}
                                {this.state.banner.length === 0 ?
                                    <Dropzone
                                        className="applicationCreateBannerDropZone"
                                        accept="image/jpeg, image/png"
                                        onDrop={(banner, rejected) => {
                                            this.setState({banner, rejected});
                                        }}
                                    >
                                        <p className="applicationCreateBannerp">+</p>
                                    </Dropzone> : <div/>
                                }
                            </GridList>
                        </div>
                        <br/>
                        <div>
                            <p className="applicationCreateScreenshotError">{this.state.errors["Screenshots"]}</p>
                            <p className="applicationCreateScreenshotTitle">Screenshots*:</p>
                            <GridList className="applicationCreateScreenshotGrid" cols={1.1}>
                                {this.state.screenshots.map((file) => (
                                    <GridTile
                                        key={Math.floor(Math.random() * 1000)}
                                        title={file[0].name}
                                        actionIcon={
                                            <IconButton onClick={this.removeScreenshot.bind(this)}>
                                                <Clear/>
                                            </IconButton>}>
                                        <img src={file[0].preview}/></GridTile>
                                ))}
                                {this.state.screenshots.length < 3 ?
                                    <Dropzone
                                        className="applicationCreateScreenshotDropZone"
                                        accept="image/jpeg, image/png"
                                        onDrop={(screenshots, rejected) => {
                                            let tmpScreenshots = this.state.screenshots;
                                            tmpScreenshots.push(screenshots);
                                            this.setState({
                                                screenshots: tmpScreenshots
                                            });
                                        }}
                                    >
                                        <p className="applicationCreateScreenshotp">+</p>
                                    </Dropzone> : <div/>}
                            </GridList>
                        </div>
                        <br/>
                        <div>
                            <p className="applcationCreateIconError">{this.state.errors["Icon"]}</p>
                            <p className="applicationCreateIconTitle">Icon*:</p>
                            <GridList className="applicationCreateIconGrid" cols={1.1}>
                                {this.state.icon.map((tile) => (
                                    <GridTile
                                        key={Math.floor(Math.random() * 1000)}
                                        title={tile.name}
                                        actionIcon={
                                            <IconButton onClick={this.removeIcon.bind(this)}>
                                                <Clear/>
                                            </IconButton>}>
                                        <img src={tile.preview}/>
                                    </GridTile>
                                ))}
                                {this.state.icon.length === 0 ?
                                    <Dropzone
                                        className="applicationCreateIconDropZone"
                                        accept="image/jpeg, image/png"
                                        onDrop={(icon, rejected) => {
                                            this.setState({icon, rejected});
                                        }}
                                    >
                                        <p className="applicationCreateIconp">+</p>
                                    </Dropzone> : <div/>}
                            </GridList>
                        </div>
                        <br/>
                    </div>
                    <br/>
                    <br/>
                    <div className="applicationCreateBackAndNext">
                        <FlatButton
                            label="< Back"
                            disabled={false}
                            onClick={this.handlePrev.bind(this)}
                            style={{marginRight: 12}}
                        />
                        <RaisedButton
                            label="Next >"
                            primary={true}
                            onClick={this.handleNext.bind(this)}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

Step2.prototypes = {
    handleNext: PropTypes.func,
    handlePrev: PropTypes.func,
    setData: PropTypes.func,
    removeData: PropTypes.func
};

export default Step2;
