# z-invoice-designer


## Introduction 
a Vue library helps design Invoice templates. 


[Designer Demo](https://www.ziwords.com/print/invoiceDesign). <br />
Once you have done the design, and pressed save button, you can see its output here: <br />
[Previewer Demo](https://www.ziwords.com/print/invoicePreview)


## Abstract structure 
```
|- index 
  |- paper 
    |- container
      |- component 
```

## Usage 
1. Drag a container into the paper 
2. Drag a component into a container 
3. You can move component by the mouse or arrow keys, To place a component in the center of a container, set left/top property to 'default'.
4. Drag the horizontal rule/ vertical rule and place them into 'receipt-container' to draw a vertical/horizontal line.(Only receipt-container accept line components).
5. To delete a component in a container, Press `delete` button.(notice: Deleting a container are not supported by now)
6. Click a component and set its properties at right-hand-side-panel. 
7. Double click `DatasourceContainer` to bind fields, and assign a permission.
8. Save the template. 
9. Preview it!


## Development 
None. 