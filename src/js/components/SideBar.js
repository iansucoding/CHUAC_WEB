import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { ROOT_NAME } from '../constants/global-variables';

class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLessThen768: window.innerWidth < 768, // 螢幕寬度是否小於768，超過768時toggle按鈕會消失
            items:[{
                title:'電表總覽',
                icon: 'fa-dashboard',
                isActive: false,
                href: '/powermeter'
            },{
                title:'中央系統',
                icon: 'fa-braille',
                isActive: false,
                children:[
                    {title:'全系統', href:"/"}, // 這是首頁
                    {title:'空調系統', href:"/airconditioning2"},
                    {title:'儲冰系統', href:"/brinesystem"},
                    {title:'冷卻水系統', href:"/cooling"}
                ]
            },{
                title:'設定',
                icon: 'fa-wrench',
                isActive: false,
                children:[
                    {title:'時序排程', href:"/airschedule"},
                    {title:'溫度啟停設定', href:"/system4"},
                    {title:'水流開關強制導通', href:"/system1"},
                    {title:'備用泵浦取代', href:"/system2"},
                    {title:'溫度偏差修正', href:"/system3"},
                    {title:'儲冰桶設定', href:"/system6"},
                    {title:'區域泵浦延時設定', href:"/system7"}
                ]  
            },{
                title:'教室平面圖',
                icon: 'fa-map',
                isActive: false,
                href: '/classimg'
            },{
                title:'臨時刻表預約',
                icon: 'fa-table',
                isActive: false,
                href: '/temporaryclass'
            },{
                title:'全天供電',
                icon: 'fa-plug',
                isActive: false,
                href: '/allsupply'
            },{
                title:'溫度即時圖',
                icon: 'fa-thermometer-empty',
                isActive: false,
                href: '/temperature'
            },{
                title:'電錶即時圖',
                icon: 'fa-bar-chart',
                isActive: false,
                href: '/power'
            },{
                title:'事件紀錄',
                icon: 'fa-list-alt',
                isActive: false,
                href: '/eventlog'
            },{
                title:'設備狀態清單',
                icon: 'fa-list',
                isActive: false,
                href: '/airconditioning'
            }]
        };

        this.updateDimensions = this.updateDimensions.bind(this);
    }

    handleClickSideMenuItem(clickedItem, event) {
        event.preventDefault();
        this.setState({
            items : this.state.items.map(item=>{
                if (item === clickedItem) {
                    return {...item, isActive: !item.isActive}
                }
                return {...item, isActive: false};
            })
        });
    }

    renderMenu() {
        return this.state.items.map((item, index)=>{
            const itemLiClass = item.isActive ? 'active' : '';

            return (
                <li key={index} className={itemLiClass}>
                    {this.renderItemContent(item)}
                    {this.renderItemChildren(item.children, item.isActive)}
                </li>
            );
        })
    }

    renderItemContent(item){
        const itemIClasses = classNames({
            'fa': true,
            [item.icon]: true,
            'fa-fw': true,
        }); 
        const hasChildren = item.children && item.children.length;
        const arrowElement = hasChildren ? <span className="fa arrow"></span>: null;

        if(hasChildren) {
            return (
                <a href="#" onClick={this.handleClickSideMenuItem.bind(this, item)}>
                    <i className={itemIClasses}></i> {item.title}
                    {arrowElement}
                </a>
            );
        } else if (item.href){
            return (
                <Link to={`${ROOT_NAME}${item.href}`}><i className={itemIClasses}></i> {item.title}</Link>
            );
        }
    }

    renderItemChildren(children, isParentActive) {
        if(children && children.length > 0) {
            const childrenHeight = {
                height: isParentActive ? `${children.length * 40}px` : '0px'
            };
            return (
                <ul className="nav nav-second-level collapsing" style={childrenHeight}>
                    {children.map((child, index)=>(
                        <li key={index}>
                            <Link to={`${ROOT_NAME}${child.href}`}>{child.title}</Link>
                        </li>
                    ))}                           
                </ul>
            )
        }
    }

    updateDimensions() {
        if (window.innerWidth < 768 && !this.state.isLessThen768) {
            this.setState({isLessThen768: true});
        } else if(window.innerWidth >= 768 && this.state.isLessThen768){
            this.setState({isLessThen768: false});
        }
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    render() {
        //const ww = window.innerWidth; // 超過768時toggle按鈕會消失
        const { toggle } = this.props;
        const isIn = this.state.isLessThen768 ? this.props.toggle : false;
        const sidebarClasses = classNames({
            'sidebar-nav':true,
            'navbar-collapse': true,
            'collapsing': this.state.isLessThen768,
        })
        // 計算目前menu應該顯示的高度
        const activeItem = this.state.items.filter(item=>item.isActive)[0]; // 被點選的menu選項
        const visibaleChildrenCount = activeItem && activeItem.children ? activeItem.children.length: 0; // 該選項的子項目數 
        const menuVisiableHeight = (this.state.items.length * 41) + (visibaleChildrenCount * 40);
        const sidebarStyle = {
            height: toggle? `${menuVisiableHeight}px`: '1px'
        };

        return (
            <div className="navbar-default sidebar" role="navigation">
                <div className={sidebarClasses} style={sidebarStyle} aria-expanded={toggle}>
                    <ul className="nav" id="side-menu">
                        {this.renderMenu()}
                    </ul>
                </div>
            </div>
        );
    }
}

export default SideBar;