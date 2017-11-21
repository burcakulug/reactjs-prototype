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

const initialLayout = getFromLS('layout') || [
    {i: 'a', x: 0, y: 0, w: 2, h: 8, minH: 4, lastHeight: 30},
    {i: 'b', x: 2, y: 0, w: 6, h: 11, minH: 4, minW: 2, maxW: 12, lastHeight: 30},
    {i: 'c', x: 8, y: 0, w: 2, h: 6, minH: 4, lastHeight: 30}
];

const initialItems = getFromLS('items') || [
    {
        i: 'a',
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
        content: (props) =>
            <PatientListGrid className="Margin-20"
                // users={this.state.users}
                             {...props}
                // showSize={true}
            />
    }
];

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
        saveToLS('layout', layout);
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
        const users = await this.getUsers();
        this.setState({users: users})
        // console.log(JSON.stringify(this.state));
    }

    onMaximizeItem(i){
        this.setState( (prevState) => {
            // debugger;
            const node = _.find(prevState.layout, {i: i});
            const newState = {...prevState, layout: [..._.reject(prevState.layout, node)]};
            const {w, h} = _.find(initialLayout, {i: i});
            const newLayout = {...node, w: node.w === 12 && node.h === 12 ? w : 12, h: node.w === 12 && node.h === 12 ? h : 12};
            newState.layout.push(newLayout)
            return newState;
        });
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
        const users = fetch("/ums/users")
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
                                <div key={item.i} className="Grid Overflow">
                                    <span className="remove" style={maximizeStyle}
                                          onClick={this.onMaximizeItem.bind(this, item.i)}>□
                                </span>
                                    <span className="remove" style={removeStyle}
                                          onClick={this.onRemoveItem.bind(this, item.i)}>x
                                </span>

                                    <br/>
                                    {item.content({users: this.state.users})}
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
