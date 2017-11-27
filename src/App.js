import React, {Component} from 'react';
import './App.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import PatientList from "./PatientList";
// import {ReactGridLayout, ResponsiveReactGridLayout} from "react-grid-layout";
import ReactGridLayout, {Responsive, WidthProvider} from "react-grid-layout";
import PatientListGrid from "./PatientListGrid";
import PatientTableGrid from "./PatientTableGrid";

import _ from 'lodash';
import ConsentList from "./ConsentList";
import {AppBar, Card, CardHeader, CardText, IconButton} from "material-ui";
import {NavigationClose, NavigationFullscreen, NavigationFullscreenExit} from "material-ui/svg-icons";
import ConsentTable from "./ConsentTable";

// const ReactGridLayout = WidthProvider(RGL);

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const PatientListWithWidth = WidthProvider(PatientList);


// layout is an array of objects, see the demo for more complete usage
// const layout = [
//     {i: 'a', x: 0, y: 0, w: 1, h: 2, static: true},
//     {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
//     {i: 'c', x: 4, y: 0, w: 8, h: 12, minW: 2,maxH: 12}
// ];

// const layout = [
//     {i: 'a', x: 0, y: 0, w: 1, h: 2, static: true},
//     {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
//     {i: 'c', x: 4, y: 0, w: 1, h: 2}
// ];

function getFromLS(key) {
    let ls = {};
    if (localStorage) {
        try {
            ls = JSON.parse(localStorage.getItem('rgl-7-' + key)) || {};
        } catch (e) {/*Ignore*/
        }
    }
    return ls[key];
}

function saveToLS(key, value) {
    if (localStorage) {
        localStorage.setItem('rgl-7-' + key, JSON.stringify({
            [key]: value
        }));
    }
}

const maxSize = {h: 12, w: 12};

const initialLayout = getFromLS('layout') || [
    {i: 'a', x: 0, y: 0, w: 2, h: 8, minH: 4, lastHeight: 30},
    {i: 'b', x: 2, y: 0, w: 6, h: 11, minH: 4, minW: 2, maxW: 12, lastHeight: 30},
    {i: 'c', x: 8, y: 0, w: 2, h: 6, minH: 4, lastHeight: 30}
];

const initialItems = getFromLS('items') || [
    {
        i: 'a',
        title: 'Lorem Ipsum',
        content: (props) =>
            <div className="Margin-20">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
                dapibus molestie tortor sed tristique. Sed quis pretium enim. Donec accumsan blandit
                tellus,
                at imperdiet eros sollicitudin a. Nullam blandit mauris odio. Aliquam eget enim nisi.
                Aenean
                eleifend rhoncus elementum. Cras rutrum felis nec est rutrum convallis. Pellentesque
                quis
                mauris id augue venenatis efficitur. Vivamus et luctus metus, sed dignissim urna. Donec
                mollis lacus ex, auctor iaculis ipsum ornare vel. Sed vel risus nibh.

                In auctor odio a dolor posuere venenatis. Nunc vitae massa ut ipsum maximus venenatis.
                Pellentesque neque turpis, efficitur ut porta at, ullamcorper vel massa. Aliquam
                egestas,
                augue quis laoreet iaculis, eros ante suscipit nulla, vitae imperdiet neque justo quis
                est.
                In elementum at enim ac accumsan. Vestibulum vel nibh non est dapibus feugiat venenatis
                non
                leo. Duis viverra vel leo in efficitur. In hac habitasse platea dictumst. Aenean ex est,
                sodales ut libero quis, vestibulum consequat lectus. Aliquam interdum aliquam arcu,
                dapibus
                pulvinar lorem feugiat dapibus. Fusce fermentum nisl et mollis viverra.

                Sed vehicula dolor a ante sagittis, at sollicitudin massa vestibulum. Donec ac fringilla
                eros. Ut dapibus laoreet dolor vel dapibus. Fusce non bibendum justo, non suscipit
                purus.
                Pellentesque pulvinar ante feugiat maximus eleifend. Sed a dictum justo. Aenean
                porttitor
                porta accumsan. Mauris et nulla gravida, posuere purus a, condimentum mi. Suspendisse
                vel
                neque eget odio efficitur fringilla non eget tellus. Suspendisse scelerisque luctus
                vestibulum. Aenean sit amet efficitur ligula.

                In tempus, lectus at venenatis tincidunt, mi arcu volutpat metus, eget lacinia orci
                mauris
                id nunc. Phasellus eu tempus nisl, et feugiat neque. Etiam ullamcorper tincidunt
                consectetur. Aliquam tempor augue nisl, a porta arcu mattis nec. Nulla facilisi. Aliquam
                sed
                quam in sem finibus rhoncus vulputate ac ex. Nullam ac est semper, commodo lorem at,
                ultrices ipsum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere
                cubilia Curae; Vivamus quis tellus nec mauris pharetra laoreet non vel mauris. Maecenas
                in
                libero quis mauris consectetur elementum.

                Morbi vel tincidunt mauris. Proin luctus ligula orci, eget volutpat elit iaculis sed. Ut
                nunc tellus, pulvinar sit amet fermentum quis, ultricies eu orci. Morbi laoreet metus
                non
                lorem tincidunt, ut luctus lacus finibus. Suspendisse elementum metus ut accumsan
                consectetur. Donec porttitor sapien sed elit ultricies, vel maximus sapien eleifend.
                Vivamus
                hendrerit sed quam ac rhoncus. Praesent facilisis tortor elit, id faucibus velit
                malesuada
                in. Nunc a porttitor tortor. Nunc tristique diam efficitur, mattis mi sit amet, interdum
                justo. Cras sit amet nulla luctus, hendrerit nibh at, pretium erat. Mauris posuere
                ornare
                sem, vel interdum mauris egestas eget. Donec justo dolor, semper vitae velit quis,
                pretium
                porta sem.

                Integer in nulla in turpis accumsan suscipit. Nam vitae nisl tellus. Mauris a metus
                augue.
                Ut tincidunt nibh non dapibus auctor. Maecenas sit amet neque nec lacus tincidunt
                gravida.
                Etiam pellentesque malesuada erat, at dapibus ligula sagittis a. Vivamus efficitur at
                purus
                quis auctor. Mauris magna diam, congue porta massa ac, porta semper est. Cras ante ex,
                commodo sed ante non, viverra semper velit. Cras nunc neque, rutrum vitae eros et.
            </div>
    },
    {
        i: 'b',
        title: 'Patient Table',
        content: (props) =>
            <PatientTableGrid className="Margin-20"
                // users={this.state.users}
                              {...props}
                // showSize={true}
                // height={this.state.layout.filter(x => x.i ==='b')[0].lastHeight.toString()}
            />
    },
    {
        i: 'c',
        title: 'Patient List',
        content: (props) =>
            <PatientListGrid className="Margin-20" style={{overflowY: 'scroll', height: '100px', width: '100px'}}
                // users={this.state.users}
                             {...props}
                // showSize={true}
            />
    }
];

const consentList = (props) => (<ConsentList className="Margin-20" {...props}/>);
const consentTable = (props) => (<ConsentTable className="Margin-20" {...props}/>);

class App extends Component {
    static defaultProps = {
        isDraggable: true,
        isResizable: true,
        items: 20,
        rowHeight: 30,
        onLayoutChange: function () {
        },
        cols: 12,
    }

    state = {users: [], layout: initialLayout, items: initialItems};

    constructor(props) {
        super(props);
        this.onResize = this.onResize.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onLayoutChange = this.onLayoutChange.bind(this);
    }

    // generateDOM() {
    //     // Generate items with properties from the layout, rather than pass the layout directly
    //     const layout = this.generateLayout();
    //     return _.map(layout, function (l) {
    //         debugger;
    //         console.log('l', l);
    //         return (
    //             <div className="Grid" key={l.i} data-grid={l}>
    //                 {l.i === '0' ? <PatientList/> : <span className="text">{l.i}</span>}
    //             </div>
    //         );
    //     });
    // }

    // generateLayout() {
    //     const p = this.props;
    //     return _.map(new Array(p.items), function (item, i) {
    //         const w = _.random(1, 2);
    //         const h = _.random(1, 3);
    //         return {
    //             x: i * 2 % 12, y: Math.floor(i / 6), w: w, h: h, i: i.toString()
    //         };
    //     });
    // }

    // onLayoutChange(layout) {
    //     console.log('layout', layout)
    //     this.props.onLayoutChange(layout);
    // }

    onResize(layout, oldLayoutItem, layoutItem, placeholder, e, el) {
        // debugger;
        console.log(arguments);
        console.log(`height:${el.offsetHeight + el.offsetTop}`);
        // this.setState((prevState) => {
        //     const oldLayout = prevState.layout.filter(x => x.i === layoutItem.i)[0];
        //     const newLayout = {...oldLayout};
        //     newLayout.lastHeight = el.offsetHeight + el.offsetTop;
        //     const newLayouts = prevState.layout.filter(x => x.i !== layoutItem.i);
        //     const newState = {...prevState};
        //     newState.layout = newLayouts.concat(newLayout);
        //     return newState;
        // });
        // console.log('resize', layout, oldLayoutItem, layoutItem, placeholder, e);

        // `oldLayoutItem` contains the state of the item before the resize.
        // You can modify `layoutItem` to enforce constraints.

        // if (layoutItem.h < 3 && layoutItem.w > 2) {
        //     layoutItem.w = 2;
        //     placeholder.w = 2;
        // }
        //
        // if (layoutItem.h >= 3 && layoutItem.w < 2) {
        //     layoutItem.w = 2;
        //     placeholder.w = 2;
        // }
    }

    onLayoutChange(layout) {
        console.log('layout', arguments);
        this.setState((prevState) => {
            const mergedLayout = prevState.layout
                .map(l => ({...l, ..._.find(layout, {i: l.i})}));
            saveToLS('layout', mergedLayout);
            return {layout: [...mergedLayout]};
        });

    }

    // generateDOM() {
    //     // Generate items with properties from the layout, rather than pass the layout directly
    //     const layout = this.generateLayout();
    //     return _.map(layout, function (l) {
    //         return (
    //             <div key={l.i} data-grid={l}>
    //                 <span className="text">{l.i}</span>
    //             </div>
    //         );
    //     });
    // }

    async componentDidMount() {
        // TODO: mock data to reduce backend dependency
        // const users = await this.getUsers();
        const users = [{"id":103,"userAuthId":"27bf6b27-18fa-473b-ab8f-b7d0ffe1ca66","lastName":"Share","firstName":"Dummy","birthDate":[2017,9,1],"genderCode":"male","socialSecurityNumber":null,"addresses":[{"use":"HOME","line1":null,"line2":null,"city":null,"stateCode":null,"postalCode":null,"countryCode":null}],"telecoms":[{"system":"EMAIL","value":"dummyshare@mailinator.com","use":"HOME"}],"roles":[{"code":"patient","name":"Patient"}],"locale":"en","disabled":false,"mrn":"C2S-DEV-OEHCGL","registrationPurposeEmail":null,"identifiers":[{"system":"https://bhits.github.io/consent2share","oid":"1.3.6.1.4.1.21367.13.20.200","value":"C2S-DEV-OEHCGL"}],"createdBy":"428e3195-5a61-4548-83fe-1ede57e27f8b","lastUpdatedBy":"428e3195-5a61-4548-83fe-1ede57e27f8b"},{"id":104,"lastName":"Sally","firstName":"Test","birthDate":[2017,10,1],"genderCode":"female","socialSecurityNumber":null,"addresses":[{"use":"HOME","line1":null,"line2":null,"city":null,"stateCode":null,"postalCode":null,"countryCode":null}],"telecoms":[{"system":"EMAIL","value":"testsally@mailinator.com","use":"HOME"}],"roles":[{"code":"patient","name":"Patient"}],"locale":"en","disabled":false,"mrn":"C2S-DEV-G8JKEI","registrationPurposeEmail":null,"identifiers":[{"system":"https://bhits.github.io/consent2share","oid":"1.3.6.1.4.1.21367.13.20.200","value":"C2S-DEV-G8JKEI"}],"createdBy":"428e3195-5a61-4548-83fe-1ede57e27f8b","lastUpdatedBy":"428e3195-5a61-4548-83fe-1ede57e27f8b"},{"id":105,"userAuthId":"f77ab7fc-5241-4620-aae0-df0cf71e39bf","lastName":"Test","firstName":"John","birthDate":[2017,10,1],"genderCode":"male","socialSecurityNumber":null,"addresses":[{"use":"HOME","line1":null,"line2":null,"city":null,"stateCode":null,"postalCode":null,"countryCode":null}],"telecoms":[{"system":"EMAIL","value":"johntest@mailinator.com","use":"HOME"}],"roles":[{"code":"patient","name":"Patient"}],"locale":"en","disabled":false,"mrn":"C2S-DEV-WUWNBA","registrationPurposeEmail":null,"identifiers":[{"system":"https://bhits.github.io/consent2share","oid":"1.3.6.1.4.1.21367.13.20.200","value":"C2S-DEV-WUWNBA"}],"createdBy":"428e3195-5a61-4548-83fe-1ede57e27f8b","lastUpdatedBy":"428e3195-5a61-4548-83fe-1ede57e27f8b"},{"id":106,"lastName":"Stark","firstName":"Sansa","birthDate":[2017,10,1],"genderCode":"female","socialSecurityNumber":null,"addresses":[{"use":"HOME","line1":null,"line2":null,"city":null,"stateCode":null,"postalCode":null,"countryCode":null}],"telecoms":[{"system":"EMAIL","value":"sansastark@mailinator.com","use":"HOME"}],"roles":[{"code":"patient","name":"Patient"}],"locale":"en","disabled":false,"mrn":"C2S-DEV-E5TE8T","registrationPurposeEmail":null,"identifiers":[{"system":"https://bhits.github.io/consent2share","oid":"1.3.6.1.4.1.21367.13.20.200","value":"C2S-DEV-E5TE8T"}],"createdBy":"428e3195-5a61-4548-83fe-1ede57e27f8b","lastUpdatedBy":"428e3195-5a61-4548-83fe-1ede57e27f8b"},{"id":107,"userAuthId":"ba981057-9d37-4ef4-9466-9216657fc0b7","lastName":"Stark","firstName":"Aria","birthDate":[2017,10,1],"genderCode":"female","socialSecurityNumber":"111111111","addresses":[{"use":"HOME","line1":null,"line2":null,"city":null,"stateCode":null,"postalCode":null,"countryCode":null}],"telecoms":[{"system":"EMAIL","value":"ariastart@mailinator.com","use":"HOME"}],"roles":[{"code":"patient","name":"Patient"}],"locale":"en","disabled":false,"mrn":"C2S-DEV-S0VLJO","registrationPurposeEmail":null,"identifiers":[{"system":"https://bhits.github.io/consent2share","oid":"1.3.6.1.4.1.21367.13.20.200","value":"C2S-DEV-S0VLJO"},{"system":"http://hl7.org/fhir/sid/us-ssn","oid":"2.16.840.1.113883.4.1","value":"111111111"}],"createdBy":"428e3195-5a61-4548-83fe-1ede57e27f8b","lastUpdatedBy":"428e3195-5a61-4548-83fe-1ede57e27f8b"},{"id":108,"lastName":"Stark","firstName":"Tamara","birthDate":[2017,10,1],"genderCode":"female","socialSecurityNumber":"222222222","addresses":[{"use":"HOME","line1":null,"line2":null,"city":null,"stateCode":null,"postalCode":null,"countryCode":null}],"telecoms":[{"system":"EMAIL","value":"tamarastark@mailinator.com","use":"HOME"}],"roles":[{"code":"patient","name":"Patient"}],"locale":"en","disabled":false,"mrn":"C2S-DEV-EAVBR7","registrationPurposeEmail":null,"identifiers":[{"system":"https://bhits.github.io/consent2share","oid":"1.3.6.1.4.1.21367.13.20.200","value":"C2S-DEV-EAVBR7"},{"system":"http://hl7.org/fhir/sid/us-ssn","oid":"2.16.840.1.113883.4.1","value":"222222222"}],"createdBy":"428e3195-5a61-4548-83fe-1ede57e27f8b","lastUpdatedBy":"428e3195-5a61-4548-83fe-1ede57e27f8b"}];
        this.setState({users: users})
        // console.log(JSON.stringify(this.state));
    }

    onMaximizeItem(i){
        this.setState( (prevState) => {
            // debugger;
            const node = _.find(prevState.layout, {i: i});
            const newState = {...prevState, layout: [..._.reject(prevState.layout, node)]};
            const newLayout = {...node, w: node.oldSize ? node.oldSize.w : maxSize.w, h: node.oldSize ? node.oldSize.h : maxSize.h};
            if(node.oldSize && newLayout.oldSize){
                delete newLayout.oldSize;
                newLayout.x=0;
                newLayout.y=0;
            } else {
                newLayout.oldSize = {h: node.h, w: node.w};
            }
            newState.layout.push(newLayout)
            return newState;
        });
    }

    async onClick(user, componentType){
        console.log('clicked', user);
        //TODO: mock data because of latency
        // const consents = await this.getConsents(user.mrn);
        const consents = [{"id":5,"fromProviders":[{"id":11,"identifiers":[{"value":"1003010489","system":"http://hl7.org/fhir/sid/us-npi","oid":"2.16.840.1.113883.4.6","display":null,"priority":0}],"address":{"line1":"11300 ROCKVILLE PIKE","line2":"SUITE 105","city":"ROCKVILLE","state":"MD","postalCode":"208523003","country":null},"deletable":false,"phoneNumber":"2404771010","providerType":"ORGANIZATION","name":"POTOMAC AUDIOLOGY LLC"},{"id":65992,"identifiers":[{"value":"1111","system":"urn:oid:2.16.840.1.113883.4.4","oid":"2.16.840.1.113883.4.4","display":null,"priority":0},{"value":"2222","system":"urn:oid:2.16.840.1.113883.4.2","oid":"2.16.840.1.113883.4.2","display":null,"priority":0}],"address":{"line1":"2 TORRANCE CT","line2":null,"city":"KENSINGTON","state":"MD","postalCode":"208952844","country":"US"},"deletable":false,"phoneNumber":"3019331537","providerType":"PRACTITIONER","firstName":"TEST","middleName":"IRENE","lastName":"PROVIDERONE"}],"toProviders":[{"id":65993,"identifiers":[{"value":"3333","system":"urn:oid:2.16.840.1.113883.4.4","oid":"2.16.840.1.113883.4.4","display":null,"priority":0},{"value":"4444","system":"urn:oid:2.16.840.1.113883.4.2","oid":"2.16.840.1.113883.4.2","display":null,"priority":0}],"address":{"line1":"6614 MELODY LANE","line2":null,"city":"BETHESDA","state":"MD","postalCode":"20817","country":null},"deletable":false,"phoneNumber":"3013650266","providerType":"ORGANIZATION","name":"TEST PROVIDERTWO"},{"id":2,"identifiers":[{"value":"1003002189","system":"http://hl7.org/fhir/sid/us-npi","oid":"2.16.840.1.113883.4.6","display":null,"priority":0}],"address":{"line1":"720 N SAINT ASAPH ST","line2":null,"city":"ALEXANDRIA","state":"VA","postalCode":"223141912","country":null},"deletable":false,"phoneNumber":"7038384455","providerType":"PRACTITIONER","firstName":"REBECCA","middleName":"I","lastName":"OLATUNJI"}],"shareSensitivityCategories":[{"description":"Substance use information is the use of mood-altering substances that interfere with or have a negative effect on a person’s life. These include negative effects on a person’s physical, psychological, social, emotional, occupational, and educational well-being. Drug abuse is characterized by dysfunction and negative consequences. Most drugs of abuse are mood altering (they change a person’s mood or feeling), and fall in three categories: stimulants, depressants, and hallucinogens.","display":"Substance use information","id":1,"identifier":{"system":"http://hl7.org/fhir/v3/ActCode","oid":null,"value":"ETH"}},{"description":"Mental illness or a psychiatric disorder is a condition that affects a person’s thinking, feeling, or mood, and may affect his or her ability to relate to others and function well on a daily basis. Mental illnesses are medical conditions that often cause a diminished ability to cope with the ordinary demands of life. Like other medical disorders, mental illness ranges from mild to severe. There is a wide variety of treatments for mental illnesses.","display":"Mental health information","id":3,"identifier":{"system":"http://hl7.org/fhir/v3/ActCode","oid":null,"value":"PSY"}},{"description":"Good sexual and reproductive health is a state of complete physical, mental, and social well-being in all matters relating to the reproductive system, at all stages of life. It implies that people are able to have a satisfying and safe sex life, the capacity to reproduce, and the freedom to decide if, when, and how often to do so. Similarly, sexual health is a state of physical, emotional, and social well-being in relation to sexuality. It is not simply the absence of disease, dysfunction, or infirmity.","display":"Sexuality and reproductive health information","id":4,"identifier":{"system":"http://hl7.org/fhir/v3/ActCode","oid":null,"value":"SEX"}}],"sharePurposes":[{"description":"To perform one or more operations on information for the provision of health care.","display":"Treatment","id":1,"identifier":{"system":"http://hl7.org/fhir/v3/ActReason","oid":null,"value":"TREAT"}},{"description":"To perform one or more operations on information for conducting financial or contractual activities related to payment for the provision of health care.","display":"Healthcare Payment","id":2,"identifier":{"system":"http://hl7.org/fhir/v3/ActReason","oid":null,"value":"HPAYMT"}},{"description":"To perform one or more operations on information for conducting scientific investigations to obtain health care knowledge.","display":"Healthcare Research","id":3,"identifier":{"system":"http://hl7.org/fhir/v3/ActReason","oid":null,"value":"HRESCH"}}],"startDate":[2017,11,13],"endDate":[2018,3,18],"consentStage":"REVOKED","consentReferenceId":"k3lsSPT9af","createdDate":1510602921000,"createdBy":"428e3195-5a61-4548-83fe-1ede57e27f8b","createdByPatient":false,"lastUpdatedDate":1510604118000,"lastUpdatedBy":"428e3195-5a61-4548-83fe-1ede57e27f8b","attestedDate":1510602938000,"attestedBy":"428e3195-5a61-4548-83fe-1ede57e27f8b","attestedByPatient":false,"revokedDate":1510604111000,"revokedBy":"428e3195-5a61-4548-83fe-1ede57e27f8b","revokedByPatient":false},{"id":4,"fromProviders":[{"id":11,"identifiers":[{"value":"1003010489","system":"http://hl7.org/fhir/sid/us-npi","oid":"2.16.840.1.113883.4.6","display":null,"priority":0}],"address":{"line1":"11300 ROCKVILLE PIKE","line2":"SUITE 105","city":"ROCKVILLE","state":"MD","postalCode":"208523003","country":null},"deletable":false,"phoneNumber":"2404771010","providerType":"ORGANIZATION","name":"POTOMAC AUDIOLOGY LLC"},{"id":65992,"identifiers":[{"value":"1111","system":"urn:oid:2.16.840.1.113883.4.4","oid":"2.16.840.1.113883.4.4","display":null,"priority":0},{"value":"2222","system":"urn:oid:2.16.840.1.113883.4.2","oid":"2.16.840.1.113883.4.2","display":null,"priority":0}],"address":{"line1":"2 TORRANCE CT","line2":null,"city":"KENSINGTON","state":"MD","postalCode":"208952844","country":"US"},"deletable":false,"phoneNumber":"3019331537","providerType":"PRACTITIONER","firstName":"TEST","middleName":"IRENE","lastName":"PROVIDERONE"}],"toProviders":[{"id":65993,"identifiers":[{"value":"3333","system":"urn:oid:2.16.840.1.113883.4.4","oid":"2.16.840.1.113883.4.4","display":null,"priority":0},{"value":"4444","system":"urn:oid:2.16.840.1.113883.4.2","oid":"2.16.840.1.113883.4.2","display":null,"priority":0}],"address":{"line1":"6614 MELODY LANE","line2":null,"city":"BETHESDA","state":"MD","postalCode":"20817","country":null},"deletable":false,"phoneNumber":"3013650266","providerType":"ORGANIZATION","name":"TEST PROVIDERTWO"},{"id":2,"identifiers":[{"value":"1003002189","system":"http://hl7.org/fhir/sid/us-npi","oid":"2.16.840.1.113883.4.6","display":null,"priority":0}],"address":{"line1":"720 N SAINT ASAPH ST","line2":null,"city":"ALEXANDRIA","state":"VA","postalCode":"223141912","country":null},"deletable":false,"phoneNumber":"7038384455","providerType":"PRACTITIONER","firstName":"REBECCA","middleName":"I","lastName":"OLATUNJI"}],"shareSensitivityCategories":[{"description":"Substance use information is the use of mood-altering substances that interfere with or have a negative effect on a person’s life. These include negative effects on a person’s physical, psychological, social, emotional, occupational, and educational well-being. Drug abuse is characterized by dysfunction and negative consequences. Most drugs of abuse are mood altering (they change a person’s mood or feeling), and fall in three categories: stimulants, depressants, and hallucinogens.","display":"Substance use information","id":1,"identifier":{"system":"http://hl7.org/fhir/v3/ActCode","oid":null,"value":"ETH"}},{"description":"Mental illness or a psychiatric disorder is a condition that affects a person’s thinking, feeling, or mood, and may affect his or her ability to relate to others and function well on a daily basis. Mental illnesses are medical conditions that often cause a diminished ability to cope with the ordinary demands of life. Like other medical disorders, mental illness ranges from mild to severe. There is a wide variety of treatments for mental illnesses.","display":"Mental health information","id":3,"identifier":{"system":"http://hl7.org/fhir/v3/ActCode","oid":null,"value":"PSY"}},{"description":"Good sexual and reproductive health is a state of complete physical, mental, and social well-being in all matters relating to the reproductive system, at all stages of life. It implies that people are able to have a satisfying and safe sex life, the capacity to reproduce, and the freedom to decide if, when, and how often to do so. Similarly, sexual health is a state of physical, emotional, and social well-being in relation to sexuality. It is not simply the absence of disease, dysfunction, or infirmity.","display":"Sexuality and reproductive health information","id":4,"identifier":{"system":"http://hl7.org/fhir/v3/ActCode","oid":null,"value":"SEX"}}],"sharePurposes":[{"description":"To perform one or more operations on information for the provision of health care.","display":"Treatment","id":1,"identifier":{"system":"http://hl7.org/fhir/v3/ActReason","oid":null,"value":"TREAT"}},{"description":"To perform one or more operations on information for conducting financial or contractual activities related to payment for the provision of health care.","display":"Healthcare Payment","id":2,"identifier":{"system":"http://hl7.org/fhir/v3/ActReason","oid":null,"value":"HPAYMT"}},{"description":"To perform one or more operations on information for conducting scientific investigations to obtain health care knowledge.","display":"Healthcare Research","id":3,"identifier":{"system":"http://hl7.org/fhir/v3/ActReason","oid":null,"value":"HRESCH"}}],"startDate":[2017,11,13],"endDate":[2018,3,18],"consentStage":"REVOKED","consentReferenceId":"8JGNJdijDS","createdDate":1510600327000,"createdBy":"428e3195-5a61-4548-83fe-1ede57e27f8b","createdByPatient":false,"lastUpdatedDate":1510600396000,"lastUpdatedBy":"428e3195-5a61-4548-83fe-1ede57e27f8b","attestedDate":1510600337000,"attestedBy":"428e3195-5a61-4548-83fe-1ede57e27f8b","attestedByPatient":false,"revokedDate":1510600389000,"revokedBy":"428e3195-5a61-4548-83fe-1ede57e27f8b","revokedByPatient":false},{"id":3,"fromProviders":[{"id":11,"identifiers":[{"value":"1003010489","system":"http://hl7.org/fhir/sid/us-npi","oid":"2.16.840.1.113883.4.6","display":null,"priority":0}],"address":{"line1":"11300 ROCKVILLE PIKE","line2":"SUITE 105","city":"ROCKVILLE","state":"MD","postalCode":"208523003","country":null},"deletable":false,"phoneNumber":"2404771010","providerType":"ORGANIZATION","name":"POTOMAC AUDIOLOGY LLC"},{"id":65992,"identifiers":[{"value":"1111","system":"urn:oid:2.16.840.1.113883.4.4","oid":"2.16.840.1.113883.4.4","display":null,"priority":0},{"value":"2222","system":"urn:oid:2.16.840.1.113883.4.2","oid":"2.16.840.1.113883.4.2","display":null,"priority":0}],"address":{"line1":"2 TORRANCE CT","line2":null,"city":"KENSINGTON","state":"MD","postalCode":"208952844","country":"US"},"deletable":false,"phoneNumber":"3019331537","providerType":"PRACTITIONER","firstName":"TEST","middleName":"IRENE","lastName":"PROVIDERONE"}],"toProviders":[{"id":65993,"identifiers":[{"value":"3333","system":"urn:oid:2.16.840.1.113883.4.4","oid":"2.16.840.1.113883.4.4","display":null,"priority":0},{"value":"4444","system":"urn:oid:2.16.840.1.113883.4.2","oid":"2.16.840.1.113883.4.2","display":null,"priority":0}],"address":{"line1":"6614 MELODY LANE","line2":null,"city":"BETHESDA","state":"MD","postalCode":"20817","country":null},"deletable":false,"phoneNumber":"3013650266","providerType":"ORGANIZATION","name":"TEST PROVIDERTWO"},{"id":2,"identifiers":[{"value":"1003002189","system":"http://hl7.org/fhir/sid/us-npi","oid":"2.16.840.1.113883.4.6","display":null,"priority":0}],"address":{"line1":"720 N SAINT ASAPH ST","line2":null,"city":"ALEXANDRIA","state":"VA","postalCode":"223141912","country":null},"deletable":false,"phoneNumber":"7038384455","providerType":"PRACTITIONER","firstName":"REBECCA","middleName":"I","lastName":"OLATUNJI"}],"shareSensitivityCategories":[{"description":"Substance use information is the use of mood-altering substances that interfere with or have a negative effect on a person’s life. These include negative effects on a person’s physical, psychological, social, emotional, occupational, and educational well-being. Drug abuse is characterized by dysfunction and negative consequences. Most drugs of abuse are mood altering (they change a person’s mood or feeling), and fall in three categories: stimulants, depressants, and hallucinogens.","display":"Substance use information","id":1,"identifier":{"system":"http://hl7.org/fhir/v3/ActCode","oid":null,"value":"ETH"}},{"description":"Human immunodeficiency virus (HIV) is a virus that weakens a person’s immune system by destroying important cells that fight disease and infection. HIV infection typically begins with flu-like symptoms followed by a long symptom-free period. HIV can be controlled with antiretroviral therapy. Untreated, HIV can advance to acquire immunodeficiency syndrome (AIDS), the most severe phase of HIV infection. People with AIDS have such badly damaged immune systems that they get an increasing number of severe illnesses, which can lead to death.","display":"HIV/AIDS information","id":2,"identifier":{"system":"http://hl7.org/fhir/v3/ActCode","oid":null,"value":"HIV"}},{"description":"Mental illness or a psychiatric disorder is a condition that affects a person’s thinking, feeling, or mood, and may affect his or her ability to relate to others and function well on a daily basis. Mental illnesses are medical conditions that often cause a diminished ability to cope with the ordinary demands of life. Like other medical disorders, mental illness ranges from mild to severe. There is a wide variety of treatments for mental illnesses.","display":"Mental health information","id":3,"identifier":{"system":"http://hl7.org/fhir/v3/ActCode","oid":null,"value":"PSY"}},{"description":"Good sexual and reproductive health is a state of complete physical, mental, and social well-being in all matters relating to the reproductive system, at all stages of life. It implies that people are able to have a satisfying and safe sex life, the capacity to reproduce, and the freedom to decide if, when, and how often to do so. Similarly, sexual health is a state of physical, emotional, and social well-being in relation to sexuality. It is not simply the absence of disease, dysfunction, or infirmity.","display":"Sexuality and reproductive health information","id":4,"identifier":{"system":"http://hl7.org/fhir/v3/ActCode","oid":null,"value":"SEX"}}],"sharePurposes":[{"description":"To perform one or more operations on information for the provision of health care.","display":"Treatment","id":1,"identifier":{"system":"http://hl7.org/fhir/v3/ActReason","oid":null,"value":"TREAT"}},{"description":"To perform one or more operations on information for conducting financial or contractual activities related to payment for the provision of health care.","display":"Healthcare Payment","id":2,"identifier":{"system":"http://hl7.org/fhir/v3/ActReason","oid":null,"value":"HPAYMT"}},{"description":"To perform one or more operations on information for conducting scientific investigations to obtain health care knowledge.","display":"Healthcare Research","id":3,"identifier":{"system":"http://hl7.org/fhir/v3/ActReason","oid":null,"value":"HRESCH"}}],"startDate":[2017,11,13],"endDate":[2018,3,18],"consentStage":"REVOKED","consentReferenceId":"YkAvDdLBAM","createdDate":1510600229000,"createdBy":"428e3195-5a61-4548-83fe-1ede57e27f8b","createdByPatient":false,"lastUpdatedDate":1510600270000,"lastUpdatedBy":"428e3195-5a61-4548-83fe-1ede57e27f8b","attestedDate":1510600241000,"attestedBy":"428e3195-5a61-4548-83fe-1ede57e27f8b","attestedByPatient":false,"revokedDate":1510600262000,"revokedBy":"428e3195-5a61-4548-83fe-1ede57e27f8b","revokedByPatient":false},{"id":2,"fromProviders":[{"id":11,"identifiers":[{"value":"1003010489","system":"http://hl7.org/fhir/sid/us-npi","oid":"2.16.840.1.113883.4.6","display":null,"priority":0}],"address":{"line1":"11300 ROCKVILLE PIKE","line2":"SUITE 105","city":"ROCKVILLE","state":"MD","postalCode":"208523003","country":null},"deletable":false,"phoneNumber":"2404771010","providerType":"ORGANIZATION","name":"POTOMAC AUDIOLOGY LLC"},{"id":65992,"identifiers":[{"value":"1111","system":"urn:oid:2.16.840.1.113883.4.4","oid":"2.16.840.1.113883.4.4","display":null,"priority":0},{"value":"2222","system":"urn:oid:2.16.840.1.113883.4.2","oid":"2.16.840.1.113883.4.2","display":null,"priority":0}],"address":{"line1":"2 TORRANCE CT","line2":null,"city":"KENSINGTON","state":"MD","postalCode":"208952844","country":"US"},"deletable":false,"phoneNumber":"3019331537","providerType":"PRACTITIONER","firstName":"TEST","middleName":"IRENE","lastName":"PROVIDERONE"}],"toProviders":[{"id":65993,"identifiers":[{"value":"3333","system":"urn:oid:2.16.840.1.113883.4.4","oid":"2.16.840.1.113883.4.4","display":null,"priority":0},{"value":"4444","system":"urn:oid:2.16.840.1.113883.4.2","oid":"2.16.840.1.113883.4.2","display":null,"priority":0}],"address":{"line1":"6614 MELODY LANE","line2":null,"city":"BETHESDA","state":"MD","postalCode":"20817","country":null},"deletable":false,"phoneNumber":"3013650266","providerType":"ORGANIZATION","name":"TEST PROVIDERTWO"},{"id":2,"identifiers":[{"value":"1003002189","system":"http://hl7.org/fhir/sid/us-npi","oid":"2.16.840.1.113883.4.6","display":null,"priority":0}],"address":{"line1":"720 N SAINT ASAPH ST","line2":null,"city":"ALEXANDRIA","state":"VA","postalCode":"223141912","country":null},"deletable":false,"phoneNumber":"7038384455","providerType":"PRACTITIONER","firstName":"REBECCA","middleName":"I","lastName":"OLATUNJI"}],"shareSensitivityCategories":[{"description":"Substance use information is the use of mood-altering substances that interfere with or have a negative effect on a person’s life. These include negative effects on a person’s physical, psychological, social, emotional, occupational, and educational well-being. Drug abuse is characterized by dysfunction and negative consequences. Most drugs of abuse are mood altering (they change a person’s mood or feeling), and fall in three categories: stimulants, depressants, and hallucinogens.","display":"Substance use information","id":1,"identifier":{"system":"http://hl7.org/fhir/v3/ActCode","oid":null,"value":"ETH"}},{"description":"Human immunodeficiency virus (HIV) is a virus that weakens a person’s immune system by destroying important cells that fight disease and infection. HIV infection typically begins with flu-like symptoms followed by a long symptom-free period. HIV can be controlled with antiretroviral therapy. Untreated, HIV can advance to acquire immunodeficiency syndrome (AIDS), the most severe phase of HIV infection. People with AIDS have such badly damaged immune systems that they get an increasing number of severe illnesses, which can lead to death.","display":"HIV/AIDS information","id":2,"identifier":{"system":"http://hl7.org/fhir/v3/ActCode","oid":null,"value":"HIV"}},{"description":"Mental illness or a psychiatric disorder is a condition that affects a person’s thinking, feeling, or mood, and may affect his or her ability to relate to others and function well on a daily basis. Mental illnesses are medical conditions that often cause a diminished ability to cope with the ordinary demands of life. Like other medical disorders, mental illness ranges from mild to severe. There is a wide variety of treatments for mental illnesses.","display":"Mental health information","id":3,"identifier":{"system":"http://hl7.org/fhir/v3/ActCode","oid":null,"value":"PSY"}},{"description":"Good sexual and reproductive health is a state of complete physical, mental, and social well-being in all matters relating to the reproductive system, at all stages of life. It implies that people are able to have a satisfying and safe sex life, the capacity to reproduce, and the freedom to decide if, when, and how often to do so. Similarly, sexual health is a state of physical, emotional, and social well-being in relation to sexuality. It is not simply the absence of disease, dysfunction, or infirmity.","display":"Sexuality and reproductive health information","id":4,"identifier":{"system":"http://hl7.org/fhir/v3/ActCode","oid":null,"value":"SEX"}}],"sharePurposes":[{"description":"To perform one or more operations on information for the provision of health care.","display":"Treatment","id":1,"identifier":{"system":"http://hl7.org/fhir/v3/ActReason","oid":null,"value":"TREAT"}},{"description":"To perform one or more operations on information for conducting financial or contractual activities related to payment for the provision of health care.","display":"Healthcare Payment","id":2,"identifier":{"system":"http://hl7.org/fhir/v3/ActReason","oid":null,"value":"HPAYMT"}},{"description":"To perform one or more operations on information for conducting scientific investigations to obtain health care knowledge.","display":"Healthcare Research","id":3,"identifier":{"system":"http://hl7.org/fhir/v3/ActReason","oid":null,"value":"HRESCH"}}],"startDate":[2017,11,13],"endDate":[2018,3,18],"consentStage":"REVOKED","consentReferenceId":"xol72CjbBL","createdDate":1510592429000,"createdBy":"428e3195-5a61-4548-83fe-1ede57e27f8b","createdByPatient":false,"lastUpdatedDate":1510594297000,"lastUpdatedBy":"428e3195-5a61-4548-83fe-1ede57e27f8b","attestedDate":1510592550000,"attestedBy":"428e3195-5a61-4548-83fe-1ede57e27f8b","attestedByPatient":false,"revokedDate":1510594290000,"revokedBy":"428e3195-5a61-4548-83fe-1ede57e27f8b","revokedByPatient":false},{"id":1,"fromProviders":[{"id":11,"identifiers":[{"value":"1003010489","system":"http://hl7.org/fhir/sid/us-npi","oid":"2.16.840.1.113883.4.6","display":null,"priority":0}],"address":{"line1":"11300 ROCKVILLE PIKE","line2":"SUITE 105","city":"ROCKVILLE","state":"MD","postalCode":"208523003","country":null},"deletable":false,"phoneNumber":"2404771010","providerType":"ORGANIZATION","name":"POTOMAC AUDIOLOGY LLC"},{"id":65992,"identifiers":[{"value":"1111","system":"urn:oid:2.16.840.1.113883.4.4","oid":"2.16.840.1.113883.4.4","display":null,"priority":0},{"value":"2222","system":"urn:oid:2.16.840.1.113883.4.2","oid":"2.16.840.1.113883.4.2","display":null,"priority":0}],"address":{"line1":"2 TORRANCE CT","line2":null,"city":"KENSINGTON","state":"MD","postalCode":"208952844","country":"US"},"deletable":false,"phoneNumber":"3019331537","providerType":"PRACTITIONER","firstName":"TEST","middleName":"IRENE","lastName":"PROVIDERONE"}],"toProviders":[{"id":65993,"identifiers":[{"value":"3333","system":"urn:oid:2.16.840.1.113883.4.4","oid":"2.16.840.1.113883.4.4","display":null,"priority":0},{"value":"4444","system":"urn:oid:2.16.840.1.113883.4.2","oid":"2.16.840.1.113883.4.2","display":null,"priority":0}],"address":{"line1":"6614 MELODY LANE","line2":null,"city":"BETHESDA","state":"MD","postalCode":"20817","country":null},"deletable":false,"phoneNumber":"3013650266","providerType":"ORGANIZATION","name":"TEST PROVIDERTWO"},{"id":2,"identifiers":[{"value":"1003002189","system":"http://hl7.org/fhir/sid/us-npi","oid":"2.16.840.1.113883.4.6","display":null,"priority":0}],"address":{"line1":"720 N SAINT ASAPH ST","line2":null,"city":"ALEXANDRIA","state":"VA","postalCode":"223141912","country":null},"deletable":false,"phoneNumber":"7038384455","providerType":"PRACTITIONER","firstName":"REBECCA","middleName":"I","lastName":"OLATUNJI"}],"shareSensitivityCategories":[{"description":"Substance use information is the use of mood-altering substances that interfere with or have a negative effect on a person’s life. These include negative effects on a person’s physical, psychological, social, emotional, occupational, and educational well-being. Drug abuse is characterized by dysfunction and negative consequences. Most drugs of abuse are mood altering (they change a person’s mood or feeling), and fall in three categories: stimulants, depressants, and hallucinogens.","display":"Substance use information","id":1,"identifier":{"system":"http://hl7.org/fhir/v3/ActCode","oid":null,"value":"ETH"}},{"description":"Human immunodeficiency virus (HIV) is a virus that weakens a person’s immune system by destroying important cells that fight disease and infection. HIV infection typically begins with flu-like symptoms followed by a long symptom-free period. HIV can be controlled with antiretroviral therapy. Untreated, HIV can advance to acquire immunodeficiency syndrome (AIDS), the most severe phase of HIV infection. People with AIDS have such badly damaged immune systems that they get an increasing number of severe illnesses, which can lead to death.","display":"HIV/AIDS information","id":2,"identifier":{"system":"http://hl7.org/fhir/v3/ActCode","oid":null,"value":"HIV"}},{"description":"Mental illness or a psychiatric disorder is a condition that affects a person’s thinking, feeling, or mood, and may affect his or her ability to relate to others and function well on a daily basis. Mental illnesses are medical conditions that often cause a diminished ability to cope with the ordinary demands of life. Like other medical disorders, mental illness ranges from mild to severe. There is a wide variety of treatments for mental illnesses.","display":"Mental health information","id":3,"identifier":{"system":"http://hl7.org/fhir/v3/ActCode","oid":null,"value":"PSY"}},{"description":"Good sexual and reproductive health is a state of complete physical, mental, and social well-being in all matters relating to the reproductive system, at all stages of life. It implies that people are able to have a satisfying and safe sex life, the capacity to reproduce, and the freedom to decide if, when, and how often to do so. Similarly, sexual health is a state of physical, emotional, and social well-being in relation to sexuality. It is not simply the absence of disease, dysfunction, or infirmity.","display":"Sexuality and reproductive health information","id":4,"identifier":{"system":"http://hl7.org/fhir/v3/ActCode","oid":null,"value":"SEX"}}],"sharePurposes":[{"description":"To perform one or more operations on information for the provision of health care.","display":"Treatment","id":1,"identifier":{"system":"http://hl7.org/fhir/v3/ActReason","oid":null,"value":"TREAT"}},{"description":"To perform one or more operations on information for conducting financial or contractual activities related to payment for the provision of health care.","display":"Healthcare Payment","id":2,"identifier":{"system":"http://hl7.org/fhir/v3/ActReason","oid":null,"value":"HPAYMT"}},{"description":"To perform one or more operations on information for conducting scientific investigations to obtain health care knowledge.","display":"Healthcare Research","id":3,"identifier":{"system":"http://hl7.org/fhir/v3/ActReason","oid":null,"value":"HRESCH"}}],"startDate":[2017,11,10],"endDate":[2018,3,18],"consentStage":"REVOKED","consentReferenceId":"dAWZ8bhtIC","createdDate":1510345059000,"createdBy":"428e3195-5a61-4548-83fe-1ede57e27f8b","createdByPatient":false,"lastUpdatedDate":1510353540000,"lastUpdatedBy":"428e3195-5a61-4548-83fe-1ede57e27f8b","attestedDate":1510345062000,"attestedBy":"428e3195-5a61-4548-83fe-1ede57e27f8b","attestedByPatient":false,"revokedDate":1510353532000,"revokedBy":"428e3195-5a61-4548-83fe-1ede57e27f8b","revokedByPatient":false}];
        console.log(consents);
        if(consents && consents.length > 0){
            this.setState(prevState => {
                // const curUser = {..._.find(prevState.users, {id: user.id})};
                // const otherUsers = [..._.reject(prevState.users, {id: user.id})];

                if(!_.find(prevState.items, {i: user.mrn})){
                    const newState = {layout: [...prevState.layout], items: [...prevState.items]};
                    newState.layout.push({i: user.mrn, x: 0, y: 0, w: 6, h: 6});
                    newState.items.push({
                        i: user.mrn,
                        title: `${user.firstName} ${user.lastName}'s Consents`,
                        content: ((props) =>{
                            const newProps = {...props, consents: consents};
                            console.log('newProps', newProps);
                            return componentType === 'list' ?  consentList(newProps) : consentTable(newProps);
                        })
                    });
                    return newState;
                } else{
                    return prevState;
                }

            });
        }
    }

    getConsents(mrn) {
        const consents = fetch(`/pcm/patients/${mrn}/consents`)
            .then(resp => resp.json())
            .then(json => json.content)/*
            .then(json => {
                console.log(json);
                return json;
            })*/;
        return consents;
    }

    onRemoveItem(i) {
        console.log('removing', i);
        this.setState({
            layout: _.reject(this.state.layout, {i: i}),
            items: _.reject(this.state.items, {i: i})
        }/*, () => saveToLS('items', this.state.items)*/);
        // this.setState((prevState) => {
        //     const newState = {...prevState};
        //     newState.layout = prevState.layout.filter(x => x.i !== i);
        //     console.log(newState);
        //     return newState;
        // });
    }

    getUsers() {
        const users = fetch("/ums/users?page=4")
            .then(resp => resp.json())
            .then(json => json.content)/*
            .then(json => {
                console.log(json);
                return json;
            })*/;
        return users;
    }

    render() {
        const removeStyle = {
            position: 'absolute',
            right: '2px',
            top: 0,
            cursor: 'pointer'
        };
        const maximizeStyle = {...removeStyle, right: '12px'};
        console.log('render', this.state)
        return (
            <div className="App">
                {/*<header className="App-header">*/}
                {/*<img src={logo} className="App-logo" alt="logo"/>*/}
                {/*<h1 className="App-title">Welcome to React</h1>*/}
                {/*</header>*/}
                {/*<p className="App-intro">*/}
                {/*To get started, edit <code>src/App.js</code> and save to reload.*/}
                {/*</p>*/}


                <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                {/*<MuiThemeProvider>*/}
                    <ReactGridLayout className="layout" layout={this.state.layout}
                                     cols={12}
                                     rowHeight={30} width={window.innerWidth}
                                     onResizeStop={this.onResize}
                                     onLayoutChange={this.onLayoutChange}
                                     autoSize={true}
                                     containerPadding={[50, 50]}
                        // margin={[50, 50]}
                    >
                        {this.state.items
                            .filter(item => !!(_.find(this.state.layout, {i: item.i})))
                            .map(item => (
                                <div key={item.i} className="Grid Overflow" >
                                    <AppBar
                                        title={item.title}
                                        // showMenuIconButton={false}
                                        onRightIconButtonTouchTap={this.onRemoveItem.bind(this, item.i)}
                                        iconElementRight={<IconButton><NavigationClose /></IconButton>}
                                        onLeftIconButtonTouchTap={this.onMaximizeItem.bind(this, item.i)}
                                        iconElementLeft={_.find(this.state.layout, {i: item.i}).oldSize ? <IconButton><NavigationFullscreenExit /></IconButton> : <IconButton><NavigationFullscreen /></IconButton> }
                                    />
                                    <Card>
                                        <CardText>
                                            {item.content({users: this.state.users, onClick: this.onClick, showSize: false})}
                                        </CardText>

                                    </Card>

                                    {/*<span className="remove" style={maximizeStyle}*/}
                                          {/*onClick={this.onMaximizeItem.bind(this, item.i)}>□*/}
                                {/*</span>*/}
                                    {/*<span className="remove" style={removeStyle}*/}
                                          {/*onClick={this.onRemoveItem.bind(this, item.i)}>x*/}
                                {/*</span>*/}

                                    {/*<br/>*/}

                                </div>
                            ))}
                        {/*<div key="a" className="Grid Overflow">*/}

                        {/*</div>*/}
                        {/*<div key="b" className="Grid Overflow">*/}
                        {/*<span className="remove" style={removeStyle}*/}
                        {/*onClick={this.onRemoveItem.bind(this, 'b')}>x</span>*/}
                        {/*<br/>*/}

                        {/*</div>*/}
                        {/*<div key="c" className="Grid Overflow">*/}

                        {/*</div>*/}
                    </ReactGridLayout>

                </MuiThemeProvider>

            </div>
        );
    }
}

export default App;
