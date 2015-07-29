import loaderUtils from 'loader-utils'
import glob from './utils/glob'
import polyScan from './scan/polyScan'

export default function webpackLoader(mask) {
    this.cacheable && this.cacheable()
    const cb = this.async()
    const options = loaderUtils.parseQuery(this.query)
    const scan = polyScan(options)
    const opts = {
        ...options,
        nodir: true
    }
    delete opts.instance
    delete opts.env
    delete opts.hostname
    delete opts.tagSeparator

    glob(mask, opts)
        .then(files => {
            files.forEach(file => this.addDependency(file))
            return scan(files)
        })
        .then(data => {
            cb(null, data)
        })
        .catch(err => cb(err))
}
