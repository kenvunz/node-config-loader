import jsYaml from 'js-yaml'
import toml from 'toml'

import os from 'os'

import merge from '../utils/merge'
import scanner from '../utils/scanner'

import strategyReader from '../readers/strategyReader'
import yamlReader from '../readers/yamlReader'
import tomlReader from '../readers/tomlReader'
import jsonReader from '../readers/jsonReader'

import nodeFilter from '../filters/nodeFilter'

export default function polyScan({
    instance = 'server',
    env = process.env.NODE_ENV,
    hostname = os.hostname(),
    tagSeparator = '#'
}) {
    const yaml = yamlReader(jsYaml)
    const tr =tomlReader(toml)

    return scanner({
        filter: nodeFilter({
            instance,
            env,
            hostname,
            tagSeparator
        }),
        readFile: strategyReader({
            'yml': yaml,
            'yaml': yaml,
            'toml': tr,
            'tml': tr,
            'json': jsonReader()
        }),
        merge
    })
}