import React, { useEffect, useRef } from "react";
import "./index.js";
import Blockly from "blockly/core";
import locale from "blockly/msg/en";
import "blockly/blocks";
import { ChakraProvider, Box, Flex, Spacer,  Grid } from "@chakra-ui/react";

Blockly.setLocale(locale);

class BlocklyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.blocklyDiv = React.createRef();
    this.toolbox = React.createRef();
  }

  componentDidMount() {
    const { initialXml, children, ...rest } = this.props;
    this.primaryWorkspace = Blockly.inject(this.blocklyDiv.current, {
      toolbox: this.toolbox.current,
      ...rest,
    });

    if (initialXml) {
      Blockly.Xml.domToWorkspace(
        Blockly.Xml.textToDom(initialXml),
        this.primaryWorkspace
      );
    }
  }

  get workspace() {
    return this.primaryWorkspace;
  }

  setXml(xml) {
    Blockly.Xml.domToWorkspace(
      Blockly.Xml.textToDom(xml),
      this.primaryWorkspace
    );
  }

  render() {
 
      
   
    const { children } = this.props;

    return (
      <>
        <Box ref={this.blocklyDiv} w="70%" h="100%" position="absolute" bottom="0"/>
        <xml

          is="blockly"
          style={{ display: "none" ,height:"982%" }}
          ref={this.toolbox}
        >
          {children}
        </xml>
      </>
    );
  }
}

export default BlocklyComponent;
