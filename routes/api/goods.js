const router = require('koa-router')()
const query = require("../../sql/index")
const SQL = require("../../sql/sql")
const SQL_TABLE_NAME = "goods"
const { GetCurrentDate, getDay } = require("../../utils/base")
router.prefix('/api/goods')
const codeError = {
    code: 400
}
/* personnel management */
router.post("/typeAdd", async (ctx, next) => {
    const { name } = ctx.request.body;
    if (!name) {
        ctx.body = {
            code: 400
        }
        return
    }
    const CHECK_SQL = SQL._select(SQL_TABLE_NAME, { type: name })
    // select goods types length > 0
    if (CHECK_SQL.length !== 0) {
        ctx.body = {
            code: 400
        }
        return
    }
    // insert
    const INSERT_SQL = SQL._insert({ type: name, date: GetCurrentDate() }, SQL_TABLE_NAME)
    const data = await query(INSERT_SQL)
    if (data.affectedRows != 0) {
        ctx.body = {
            code: 200,
            msg: "添加成功！"
        }
    } else {
        ctx.body = {
            code: 400
        }
    }
})

router.get("/typeGet", async (ctx) => {
    const SELECT_SQL = `SELECT * FROM ${SQL_TABLE_NAME} order by id desc;`
    const data = await query(SELECT_SQL);
    ctx.body = {
        list: data,
        code: 200
    }
})

router.post("/typeDelete", async (ctx) => {
    const { id } = ctx.query;
    const SELECT_SQL = SQL.deleteId(SQL_TABLE_NAME, id)
    const data = await query(SELECT_SQL);
    if (data.affectedRows != 0) {
        ctx.body = {
            code: 200,
            msg: "删除成功！"
        }
    } else {
        ctx.body = {
            code: 400
        }
    }
})
const TABLE_NAME_TYPE = "option_type";
const TABLE_NAME_SIZE = "option_size";
const TABLE_NAME_MATERIAL = "option_materilal";
const TABLE_NAME_BRAND = "option_brand";
const TABLE_NAME_KIND = "option_kind";
let cache_type = null
let cache_size = null
let cache_material = null
let cache_brand = null
let cache_kind = null
const retunTypeName = (type) => {
    let TABLE_NAME;
    switch (+type) {
        case 1:
            TABLE_NAME = TABLE_NAME_TYPE
            break;
        case 2:
            TABLE_NAME = TABLE_NAME_SIZE
            break;
        case 3:
            TABLE_NAME = TABLE_NAME_MATERIAL
            break;
        case 4:
            TABLE_NAME = TABLE_NAME_BRAND
            break;
        case 5:
            TABLE_NAME = TABLE_NAME_KIND
            break;
    }
    return TABLE_NAME
}

router.post("/optionsTypeAdd", async (ctx) => {
    const { name, type } = ctx.request.body;
    const TABLE_NAMES = retunTypeName(type)
    if (!name) {
        return ctx.body = { code: 400 }
    }
    const ADD_SQL = SQL._insert({ date: GetCurrentDate(), name: name }, TABLE_NAMES)
    const data = await query(ADD_SQL)
    if (data.affectedRows != 0) {
        ctx.body = {
            code: 200,
            msg: "add success"
        }
    } else {
        ctx.body = {
            code: 400,
            msg: "add error"
        }
    }
})
const getOptions = async (_type, ctx) => {
    let type;
    if (_type) {
        type = _type
    } else {
        type = ctx.query.type
    }
    if (!type) {
        return false
    }

    const TABLE_NAMES = retunTypeName(type)
    const GET_SQL = `SELECT * FROM ${TABLE_NAMES} order by id desc;`
    let data = await query(GET_SQL)
    switch (type) {
        case 1:
            cache_type = data;
            break;
        case 2:
            cache_size = data;
            break;
        case 3:
            cache_material = data;
            break;
        case 4:
            cache_brand = data;
            break;
        case 5:
            cache_kind = data;
            break;
    }
    return {
        list: data,
        code: 200
    }
}
router.get("/optionsTypeGet", async (ctx) => {
    await getOptions(false, ctx).then(res => {
        if (res) {
            ctx.body = res
        } else {
            ctx.body = codeError
        }
    })
})
router.post("/optionsTypeDelete", async (ctx) => {
    const { id, type } = ctx.request.body;
    const TABLE_NAMES = retunTypeName(type)
    const SELECT_SQL = SQL.deleteId(TABLE_NAMES, id)
    const data = await query(SELECT_SQL);
    if (data.affectedRows != 0) {
        ctx.body = {
            code: 200,
            msg: "删除成功！"
        }
    } else {
        ctx.body = {
            code: 400
        }
    }
})
const GOODS_TABLE_NAME = "goods"
router.post("/goodsAdd", async (ctx) => {
    const { name, number, type, size, material, brand, kind } = ctx.request.body;
    let _number = parseInt(number)

    if (isNaN(_number) || !Array.isArray(size)) {
        ctx.body = codeError
        return
    }
    if (!name || !number || !type || !size || !material || !brand || !kind) {
        ctx.body = codeError
        return;
    }
    const options = {
        name, number: _number, type, size, material, brand, kind, date: GetCurrentDate()
    }
    const ADD_SQL = SQL._insert(options, GOODS_TABLE_NAME)

    const data = await query(ADD_SQL)
    if (data.affectedRows != 0) {
        ctx.body = {
            code: 200
        }
    } else {
        ctx.body = {
            code: 400
        }
    }


})

router.get("/goodsGet", async (ctx) => {
    const { name, number, type, size, material, brand, kind, current = 1, pageSize = 20 } = ctx.query;
    const count = await query(SQL._count(GOODS_TABLE_NAME));
    const total = Object.values(count[0])[0]
    let options = {
        name: name || "",
        number: number || "",
        type: type || "",
        size: size || "",
        material: material || "",
        brand: brand || "",
        kind: kind || "",
    }
    let search = {};
    for (let key in options) {
        if (options[key]) {
            search[key] = options[key]
        }
    }
    const QUERY_LIST = SQL._multi_query(
        options,
        GOODS_TABLE_NAME,
        (current - 1) * pageSize,
        pageSize)
    let data = await query(QUERY_LIST)
    // 查询各种类别   
    if (!cache_type) {
        await getOptions(1)
    }
    if (!cache_size) {
        await getOptions(2)
    }
    if (!cache_material) {
        await getOptions(3)
    }
    if (!cache_brand) {
        await getOptions(4)
    }
    if (!cache_kind) {
        await getOptions(5)
    }

    let _data = data.map(elem => {
        let _size = elem.size.split(",")
        let _size_da = _size.map(y => {
            return cache_size.filter(x => y == x.Id)[0].name
        })
        return {
            ...elem,
            type: cache_type.filter(x => elem.type == x.Id)[0].name || "",
            size: _size_da.join(","),
            material: cache_material.filter(x => elem.material == x.Id)[0].name || "",
            brand: cache_brand.filter(x => elem.brand == x.Id)[0].name || "",
            kind: cache_kind.filter(x => elem.kind == x.Id)[0].name || "",
        }
    })
    ctx.body = {
        list: _data,
        total: total,
        code: 200
    }

})
router.post("/goodsDelete", async (ctx) => {
    const { id } = ctx.request.body;
    if (!id) {
        ctx.body = codeError;
    }
    let data = await query(SQL.deleteId(GOODS_TABLE_NAME, id))
    if (data.affectedRows !== 0) {
        ctx.body = { code: 200 }
    } else {
        ctx.body = codeError;
    }
})
const has = (obj, pro) => {
    return pro.map(elem => obj.hasOwnProperty(elem)).indexOf(false) !== -1
}
router.post("/goodsEdit", async (ctx) => {
    const body = ctx.request.body;
    // if has property
    let isHas = has(body, ['name', 'number', 'type', 'size', 'material', 'brand', 'kind', 'id'])
    if (isHas) {
        //not has
        ctx.body = codeError;
    } else {
        const EDIT_SQL = SQL._update(
            { Id: body.id },
            {
                name: body.name,
                number: body.number,
                type: body.type,
                size: body.size,
                material: body.material,
                brand: body.brand,
                kind: body.kind
            },
            GOODS_TABLE_NAME
        )
        let data = await query(EDIT_SQL);
        if (data.affectedRows === 1) {
            ctx.body = {
                code: 200
            }
        } else {
            ctx.body = codeError
        }
    }

})
module.exports = router