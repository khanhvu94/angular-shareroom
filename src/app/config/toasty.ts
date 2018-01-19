import {
    ToastyService,
    ToastyConfig,
    ToastOptions,
    ToastData
  } from "ng2-toasty";

export class DataProvide {

    private toastyConfig;
    private toastyService;
    constructor(
    ) {
        this.toastyConfig = new ToastyConfig;
        this.toastyService = ToastyService;        
    }

    addToast(type: string, title: string, mgs: string) {
        var toastOptions: ToastOptions = {
          title: title,
          msg: mgs,
          showClose: true,
          timeout: 5000,
          theme: "bootstrap",
          onAdd: (toast: ToastData) => {
            // console.log('Toast ' + toast.id + ' has been added!');
          },
          onRemove: function(toast: ToastData) {
            // console.log('Toast ' + toast.id + ' has been removed!');
          }
        };
        // Add see all possible types in one shot
        switch (type) {
          case "default":
            this.toastyService.default(toastOptions);
            break;
          case "info":
            this.toastyService.info(toastOptions);
            break;
          case "success":
            this.toastyService.success(toastOptions);
            break;
          case "wait":
            this.toastyService.wait(toastOptions);
            break;
          case "error":
            this.toastyService.error(toastOptions);
            break;
          case "warning":
            this.toastyService.warning(toastOptions);
            break;
        }
      }
   
}