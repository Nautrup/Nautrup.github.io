import React from 'react';

let instance = null

class PageController extends React.Component {

    static goTo(pageName) {
        if(!instance) return
        instance.setCurrentPage(pageName)
    }

    pathMap = {}

    constructor(props) {
        if(instance)
            return instance

        super(props)
        instance = this

        React.Children.forEach(this.props.children, child => {
            if(!React.isValidElement(child))
                return

            if(!child.props.path)
                throw new Error("The pagecontroller child element is missing the path property.")

            this.pathMap[child.props.path] = child
        })

        this.state = {
            currentPath: props.default,
        }
    }

    render() {
        const child = this.pathMap[this.state.currentPath] ?? (<p>No page</p>)
        
        return (
            <div className="page-container">
                {child}
            </div>
        )
    }
    setCurrentPage(pageName) {
        this.setState({currentPath: pageName})
    }
}

export default PageController