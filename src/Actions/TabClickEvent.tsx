const TabClickEventType = {
    swapTab: 'SWAP_TAB'
}

const TabClickEventCreator = {
    swapTab: (tabString: string) => ({
        type: TabClickEventType.swapTab,
        tabString
    })
}

export {
    TabClickEventType,
    TabClickEventCreator
}