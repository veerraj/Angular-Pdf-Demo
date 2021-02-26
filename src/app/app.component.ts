import { Component } from '@angular/core';
import { base64 } from './base64'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pdfDemo';


      base64toBlob(base64Data, contentType) {
        contentType = contentType || '';
        var sliceSize = 1024;
        var byteCharacters = atob(base64Data);
        var bytesLength = byteCharacters.length;
        var slicesCount = Math.ceil(bytesLength / sliceSize);
        var byteArrays = new Array(slicesCount);
    
        for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
            var begin = sliceIndex * sliceSize;
            var end = Math.min(begin + sliceSize, bytesLength);
    
            var bytes = new Array(end - begin);
            for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
                bytes[i] = byteCharacters[offset].charCodeAt(0);
            }
            byteArrays[sliceIndex] = new Uint8Array(bytes);
            console.log(new Blob(byteArrays, { type: contentType }))
        }
        return new Blob(byteArrays, { type: contentType });
    }
    
    saveData = (()=>{
        var a:any = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
       
               var blob = this.base64toBlob(base64
                ,"")
               
               var url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = 'pdfDemo.zip';
            a.click();
            window.URL.revokeObjectURL(url);
        
    })
}
