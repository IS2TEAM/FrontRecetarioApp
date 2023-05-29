import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  inspectionList: any[]=[]

  transform(value: any, arg: any): any {
    if (!arg) {
      return value;
    }
    const result =[];
    for(const post of value){
      const subjectStatusString = post.subjectStatus.toString();
      if(subjectStatusString.indexOf(arg)> -1){
        result.push(post)
      }
    }
    return result;
  }

}
