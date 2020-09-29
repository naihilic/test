if($(IPython.toolbar.selector.concat(' > #AIDU')).length == 0) {
  IPython.toolbar.add_buttons_group([{
    'label'   : 'AIDU',
    'icon'    : 'fa fa-angle-double-down',
    'callback': function() {
  var cell=IPython.notebook.get_selected_cell();
      cell.set_text('import sys\nsys.path.insert(0,"aiya.zip")\n%matplotlib inline\nfrom aiya.home import home\nhome.init()');
      IPython.notebook.execute_cell(cell);
    }}], 'AIDU');}

// init
//IPython.events.on('app_initialized.NotebookApp', function(){
//IPython.events.on('app_initialized.DashboardApp', function(){
//$([IPython.events]).on('notebook_loaded.Notebook', function(){
//    alert('loaded');
//var cellTop=IPython.notebook.get_selected_cell();
//cellTop.set_text('%matplotlib inline\nfrom aiya.home import home\nhome.init()');
//IPython.notebook.execute_cell(cellTop);


//var x=0;
//if (x==0) {
//    x=x+1;
//    var cellTop=IPython.notebook.get_selected_cell();
//    cellTop.set_text('%matplotlib inline\nfrom aiya.home import home\nhome.init()');
//    IPython.notebook.execute_cell(cellTop);
//}

//var cell = Jupyter.notebook.insert_cell_below('code', 0).set_text('%matplotlib inline\nfrom aiya.home import home\nhome.init()');
//Jupyter.notebook.execute_all_cells();

function launch_first_cell (evt) {
  //alert(evt.type);
  if (!launch_first_cell.executed
      //&& evt.type=='kernel_ready'	
      && IPython.notebook.kernel 
      && IPython.notebook.kernel.is_connected()
     ) {
      var codeBlock = '%matplotlib inline\nfrom aiya.home import home\nhome.init()';
      //var cellTop=IPython.notebook.get_selected_cell();
      //var cellTop = IPython.notebook.insert_cell_above('code', 0);
      var cellTop = IPython.notebook.get_cells()[0];
      if (cellTop.get_text().length >0 && cellTop.get_text() != codeBlock) {
	  cellTop = IPython.notebook.insert_cell_above('code', 0).set_text(codeBlock);
	  IPython.notebook.get_cells()[0].execute();
      } else if (cellTop.get_text().length >0 && cellTop.get_text() == codeBlock) {
	  //cellNew = IPython.notebook.insert_cell_below('code');
	  //cellNew.set_text(codeBlock);
	  //IPython.notebook.get_cells()[0].execute();
      } else {
	  cellTop.set_text(codeBlock);
	  //IPython.notebook.get_cells()[0].execute();
      }
      //cellTop.set_text(codeBlock);
      //cellTop.clear_output();
      //IPython.notebook.execute_cell(cellTop);
      //IPython.notebook.get_cells()[0].execute();
      launch_first_cell.executed = true;
  }
  IPython.notebook.get_cells()[0].execute();

  return launch_first_cell;
}

$([IPython.events]).on('kernel_ready.Kernel kernel_created.Session', launch_first_cell);


define([
        'base/js/namespace',
        'base/js/promises'
     ], function(Jupyter, promises) {
         promises.notebook_loaded.then(function(appname) {
	     //alert('notebook loaded');
             //if (appname === 'Notebook') {
             //    alert('notebook loaded');
             //}
         });
         promises.checkpoint_restored.then(function(appname) {
	     //alert('checkpoint restored');
             //if (appname === 'Notebook') {
             //    alert('notebook loaded');
             //}
         });
     });
