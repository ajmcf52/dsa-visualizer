import React from 'react';
import Graph from '../Graph';
import { connect } from 'react-redux';
import { RootState } from '../../store';

interface GraphAnimatorProps {
    graphRef: React.RefObject<InstanceType<typeof Graph>>;
    animatingEdge: string;
    animatingNode: string;
}

interface GraphAnimatorState {
    prevAnimatedEdge: string;
    prevAnimatedNode: string;
}

class GraphAnimator extends React.Component<
    GraphAnimatorProps,
    GraphAnimatorState
> {
    state = {
        prevAnimatedEdge: '',
        prevAnimatedNode: '',
    };
    componentDidUpdate() {
        const { animatingEdge, animatingNode, graphRef } = this.props;
        if (animatingEdge !== this.state.prevAnimatedEdge) {
            graphRef.current.traverseEdge(animatingEdge);
            this.setState((prevState) => {
                let newState = { ...prevState };
                newState.prevAnimatedEdge = animatingEdge;
                return newState;
            });
        } else if (animatingNode !== this.state.prevAnimatedNode) {
            graphRef.current.visitNode(animatingNode);
            this.setState((prevState) => {
                let newState = { ...prevState };
                newState.prevAnimatedNode = animatingNode;
                return newState;
            });
        }
    }
    render() {
        return <div />;
    }
}

const mapStateToProps = (state: RootState, props: GraphAnimatorProps) => ({
    animatingEdge:
        state && state.graphDetails && state.graphDetails.animateEdge,
    animatingNode:
        state && state.graphDetails && state.graphDetails.animateNode,
});

const connectedComp = connect(mapStateToProps, null)(GraphAnimator);

export default connectedComp;
