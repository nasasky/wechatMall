<?php
/**
 * Created by PhpStorm.
 * User: Django
 * Date: 2018-12-04
 * Time: 16:17
 */

namespace app\api\controller\v1;


use app\api\controller\BaseController;
use app\api\validate\IDMustBeIPositiveInt;
use app\api\validate\ListParamValidate;
use app\api\model\Theme as ThemeModel;
use app\exception\DeleteException;
use app\exception\ThemeException;

class Theme extends BaseController
{
    public function getTheme($ids="1,2,3"){
        (new ListParamValidate())->toCheck();
        $arr = explode(",", $ids);
        $result = (new ThemeModel())->getThemes($arr);
        if (!$result){
            throw new ThemeException();
        }
        return $result;
    }

    public function getAllThemes(){
        $result = (new ThemeModel())->getAllThemes();
        if (!$result){
            throw new ThemeException();
        }
        return $result;
    }

    public function getThemeByID($id){
        (new IDMustBeIPositiveInt())-> toCheck();
        $result = (new ThemeModel())->getThemeByID($id);
        if (!$result){
            throw new ThemeException();
        }
        return $result;
    }

    public function delete($id){
        (new IDMustBeIPositiveInt())->toCheck();
        $result = (new ThemeModel())::destroy($id);
        if ($result){
            return;
        }
        throw new DeleteException();
    }
}