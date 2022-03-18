<?php

namespace Traits;

trait Hydrate
{
    private function hydrate(array $properties):void{
        foreach($properties as $property => $value){
            $method = "set".str_replace(" ","",ucwords(str_replace("_"," ",$property)));
            if(method_exists($this,$method)){
                $this->$method($value);
            }
        }
    }
}