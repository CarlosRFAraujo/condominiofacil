const validaCpf = function (data) {
    const n = Array.from(data)
    const n1 = parseInt(n[0])
    const n2 = parseInt(n[1])
    const n3 = parseInt(n[2])
    const n4 = parseInt(n[3])
    const n5 = parseInt(n[4])
    const n6 = parseInt(n[5])
    const n7 = parseInt(n[6])
    const n8 = parseInt(n[7])
    const n9 = parseInt(n[8])
    const n10 = parseInt(n[9])
    const n11 = parseInt(n[10])


    const dv1 = ((n1*1)+(n2*2)+(n3*3)+(n4*4)+(n5*5)+(n6*6)+(n7*7)+(n8*8)+(n9*9))%11

    let valido
        
    if (dv1 < 10) {
        if(n10 != dv1) {
            return valido = false
        } else {
            const dv2 = ((n1*0)+(n2*1)+(n3*2)+(n4*3)+(n5*4)+(n6*5)+(n7*6)+(n8*7)+(n9*8)+(dv1*9))%11
            if (dv2 < 10) {
                if (n11 != dv2) {
                    return valido = false
                } else {
                    return valido = true
                }
            } else {
                if (n11 != (dv2 - 10)) {
                    return valido = false
                } else {
                    return valido = true
                }
            }
        }
    } else {
        if (n10 != (dv1 - 10)) {
            return valido = false
        } else {
            return valido = true
        }
    }

}

module.exports = validaCpf