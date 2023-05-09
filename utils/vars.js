const path = require("path");

const dirs = {};

dirs.src = path.join(process.env.INIT_CWD);
dirs.data = path.join(dirs.src, 'data');
dirs.assets = path.join(dirs.src, 'assets');
dirs.env = path.join(dirs.src, 'env');

dirs.rn = path.join(dirs.src, 'mobile');
dirs.rn_android = path.join(dirs.rn, 'android');
dirs.rn_android_src = path.join(dirs.rn_android, 'app', 'src', 'main');
dirs.rn_src = path.join(dirs.rn, 'src')
dirs.rn_assets = path.join(dirs.rn, 'assets')
dirs.rn_fonts = path.join(dirs.rn_assets, 'fonts')
dirs.rn_iconfig = path.join(dirs.rn_assets, 'config')
dirs.rn_images = path.join(dirs.rn_assets, 'images')
dirs.rn_svg = path.join(dirs.rn_assets, 'svg')
dirs.rn_screens = path.join(dirs.rn_src, 'screens')
dirs.rn_components = path.join(dirs.rn_src, 'components')
dirs.rn_theme = path.join(dirs.rn_src, 'theme')
dirs.rn_providers = path.join(dirs.rn_src, 'providers')
dirs.rn_models = path.join(dirs.rn_src, 'models')
dirs.rn_shared = path.join(dirs.rn_src, 'shared')

module.exports = {dirs};
