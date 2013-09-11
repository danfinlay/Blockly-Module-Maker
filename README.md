#Blockly Module Maker

Blockly XML trees are pretty dense, and if you're making a big set of blocks, adding a single one can be a bit of a pain.

    <xml id="toolbox" style="display: none">
      <category name="Core">
        <category name="Control">
          <block type="controls_if"></block>
          <block type="controls_whileUntil"></block>
        </category>
        <category name="Logic">
          <block type="logic_compare"></block>
          <block type="logic_operation"></block>
          <block type="logic_boolean"></block>
        </category>
      </category>
      <category name="Custom">
        <block type="start"></block>
        <category name="Move">
          <block type="move_forward"></block>
          <block type="move_backward"></block>
        </category>
        <category name="Turn">
          <block type="turn_left"></block>
          <block type="turn_right"></block>
        </category>
      </category>
    </xml>

This [Node.js](http://nodejs.org/) module allows you to point to a folder.  That folder name will be treated as the root category name.  Each contained folder recursively will be a new category within that category, and each file contained within will be added as a block to the XML tree.

The module will return an array with two members:  The XML for this Blockly category, and a concatenated string of all the files that were parsed.

The module contains three files, the `moduleMaker`, which works as just described, the `bloccoliBuilder`, which combines these things in such a way that it's ready to add directly into [Bloccoli](http://bloccoli.org)'s blocks folder, allowing it to be added to any project on the site, and lastly, the `bloccoliBuilderCli`, which does the same thing as the bloccoliBuilder, but can be called from the command line and piped into a file.

These operations are all done synchronously, so it is probably not best to do on the fly by its current design.