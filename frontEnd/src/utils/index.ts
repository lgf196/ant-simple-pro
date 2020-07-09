class Tools {
    createALabel(path:string,fileName:string='用户信息.xlsx'){
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = path
        link.setAttribute('download',fileName)
        document.body.appendChild(link)
        link.click()
        link.remove()
        window.URL.revokeObjectURL(path)
    }
}

export default new Tools();