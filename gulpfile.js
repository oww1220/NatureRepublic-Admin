const URL = 'admin';

const gulp = require('gulp');
const del = require('del');

/*유틸*/
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');

/*view server*/
const browserSync = require('browser-sync').create();
//서버실행
browserSync.init({
    //logLevel: 'debug',
    port: 3337,
    open: false,
    directory: true,
    server: './wwwroot/',
    browser: 'google chrome',
});

/*scss, css*/
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const autoprefixer = require('gulp-autoprefixer');
const modifyCssUrls = require('gulp-modify-css-urls');
const pxtorem = require('gulp-pxtorem');
const cssnano = require('gulp-cssnano');


/*오류 처리*/
const plumber = require('gulp-plumber');

/*타입스크립트*/
const ts = require('gulp-typescript');

/*webpack*/
const webpack = require('webpack-stream');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const errorHandler = (error)=>{
    console.error(error.message);
    this.emit('end');
};
const plumberOption = {
    errorHandler: errorHandler,
};


const autoprefixBrowsers = ['> 0%', 'last 4 versions'];
const BASE_URL = `./wwwroot/${URL}`;
const TASK_BASE_URL = `${BASE_URL}/assets`;


// typescript: typescript 컴파일러
gulp.task('ts', ()=> {
    const tsProject = ts.createProject('tsconfig.json');
return gulp
    .src(`${TASK_BASE_URL}/ts/**/*.ts`
        , {allowEmpty: true}
    )
    .pipe(tsProject())
    .pipe(gulp.dest(`${TASK_BASE_URL}/scripts/build`))
});


// webpack: 타입스크립트 컴파일 && 바밸 트렌스파일링
gulp.task('webpack', ()=>
    gulp
    .src(`${TASK_BASE_URL}/scripts/build/**/*.js`, {allowEmpty: true})
    .pipe(plumber(plumberOption))
    .pipe(webpack({
        mode: 'production',
        // 파일 다중으로 내보내기 가능
        /*
        entry: {
            //CommonUI: [`${TASK_BASE_URL}/scripts/build/dist/CommonUI.js`, `${TASK_BASE_URL}/scripts/build/dist/browser.js`],
            //UI: `${TASK_BASE_URL}/scripts/build/dist/UI/Datepicker.js`,
        },
        output: {filename: '[name].bundle.js'},
        */
        output: {
            filename: '[name].chunk.js',
        },
        resolve: {
            extensions: ['.js']
        },
        optimization: {
            splitChunks: {
                chunks: 'all',
                maxInitialRequests: Infinity,
                minSize: 0,
                cacheGroups: {
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        priority: 1,
                        reuseExistingChunk: true,
                    },
                    jquery: {
                        test: /[\\/]node_modules[\\/](jquery)[\\/]/,
                        name: 'jquery',
                        priority: 2,
                        reuseExistingChunk: true,
                    },
                    jqueryui: {
                        test: /[\\/]node_modules[\\/](jqueryui)[\\/]/,
                        name: 'jqueryui',
                        priority: 2,
                        reuseExistingChunk: true,
                    }
                }
            }
        },
        devtool: 'source-map',
        module: {   
            rules: [
                {
                    test: /\.(js)$/,
                    exclude: /node_modules\/(?!bullets-js)/,
                    use: ['babel-loader'],
                }
            ]
        },
        /*
        plugins: [
            new BundleAnalyzerPlugin({
                analyzerMode: 'static',               // 분석결과를 파일로 저장
                reportFilename: 'docs/size_dev.html', // 분설결과 파일을 저장할 경로와 파일명 지정
                defaultSizes: 'parsed',
                openAnalyzer: false,                   // 웹팩 빌드 후 보고서파일을 자동으로 열지 여부
                generateStatsFile: true,              // 웹팩 stats.json 파일 자동생성
                statsFilename: 'docs/stats_dev.json', // stats.json 파일명 rename
            })
        ]*/
    }))
    .pipe(gulp.dest(`${TASK_BASE_URL}/scripts/bundle`))
    .pipe(browserSync.reload({ stream: true }))
);

// concat: 제이쿼리 코어및 사용 플러그인들 머지 -- 선택
gulp.task('jquery:concat', ()=>
    gulp
    .src(`${TASK_BASE_URL}/scripts/jquery/**/*.js`)
    .pipe(plumber(plumberOption))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(concat('jquery.bundle.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(`${TASK_BASE_URL}/scripts/bundle`))
);

// sass: sass컴파일러, px-->rem, autoprefixer 
gulp.task('sass', ()=>
    gulp
    .src(`${TASK_BASE_URL}/scss/**/*.scss`)
    .pipe(plumber(plumberOption))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(
        sass({
            outputStyle: 'compressed', //[nested, compact, expanded, compressed]
            //indentType: 'tab',
            //indentWidth: 1,
        }).on('error', sass.logError)
    )
    .pipe(cssnano())
    .pipe(
        autoprefixer({
            browsers: autoprefixBrowsers,
            cascade: true,
        })
	)
    //.pipe(concat('UI.bundle.css'))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(`${TASK_BASE_URL}/styles`))
    .pipe(browserSync.reload({ stream: true }))
);

// clean: 파일정리(delete)
gulp.task('clean', ()=>
    del([`${TASK_BASE_URL}/scripts/build`], {force:true})
);

// watch: 소스 옵져빙(소스변경 감지해서 task실행및 서버 재시작)
gulp.task('watch', ()=> {


    // watch sass
    gulp.watch(
        `${TASK_BASE_URL}/scss/**/*.scss`,
        gulp.series('sass')
    );

    // watch ts
    gulp.watch(
        `${BASE_URL}/**/*.ts`,
        gulp.series('ts', 'webpack', 'clean')
    );

    // watch html
    gulp.watch(`${BASE_URL}/**/*.html`).on('change', browserSync.reload);
});

// task 묶어서 실행
gulp.task(
    'default',
    gulp.series('sass', 'ts', 'webpack', 'clean', 'watch')
);
