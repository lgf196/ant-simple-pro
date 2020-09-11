class Tools {
   public sqlDeal(parps:object){
        let sqlKey:string[]=[],sqlObj:object={};
        for (const  key in parps) {
            if (Object.prototype.hasOwnProperty.call(parps, key)) {
                const item =parps[key];
                if((item!==null || item!=undefined) && key!=='id'){
                    sqlKey.push(`${key}=?`);
                    sqlObj[key]=item;
                }
            }
        }
        return {sqlVal:Object.values(sqlObj),sqlKey:sqlKey.join(),sqlObj} as const
   }
}
export default new Tools();