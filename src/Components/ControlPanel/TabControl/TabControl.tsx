import './TabControl.css'
import React from 'react'
import  { connect } from 'react-redux'
import { PayloadAction } from '@reduxjs/toolkit'
import { TabClickEventCreator } from '../../../Actions/TabClickEvent'
import { RootState } from '../../../store'

interface TabControlProps {
    tabClick: (tabString: string) => {},
    selectedTab: string
}

const TabControl = (props: TabControlProps) => {
    const { tabClick, selectedTab } = props

    return <div className='tabContainer'>
        <ul className='tabRow'>
            <li id='sorting' className={selectedTab === 'sorting' ? 'selected' : ''} 
                onClick={(e) => tabClick(e.currentTarget.id)}><a href="#sorting">Sorting</a></li>
            <li id='searching' className={selectedTab === 'searching' ? 'selected' : ''} 
                onClick={(e) => tabClick(e.currentTarget.id)}><a href="#searching">Searching</a></li>
        </ul>
    </div>

}

const mapStateToProps = (state: RootState, props: TabControlProps) => ({
    selectedTab: state && state.tabClicks && state.tabClicks.currentTab
})

const mapDispatchToProps = {
    tabClick: TabClickEventCreator.swapTab
}

const connectedComp = connect(
    mapStateToProps,
    mapDispatchToProps
)(TabControl)

export default connectedComp
