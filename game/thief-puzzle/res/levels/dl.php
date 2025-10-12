<?php

for ($i = 1; $i <= 400; ++$i) {
    $file = __DIR__ . "/lv{$i}.dat";
    if (false == file_exists($file)) {
        echo $i,PHP_EOL;
        `curl "http://127.0.0.1:8081/proxy?uri=res/levels/lv{$i}.dat?v=1.4.0" --output nul`;
    }
}
