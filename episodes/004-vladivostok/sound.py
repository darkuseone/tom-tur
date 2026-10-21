"""Звук выпуска 004 — Владивосток: SFX и атмосферы, привязанные к событиям картинки (T.EV из ev.json — tools/evdump.cjs) и репликам.
SFX: (файл в assets/sfx без .mp3, время, поправка дБ). BEDS: (луп, начало, конец)."""


def sound(T):
    E, S0, S1, LS, LF, DUR = T.EV, T.S0, T.S1, T.LS, T.LF, T.DUR
    e = lambda k, d=0.0: E[k] + d
    chops = [e('ps_chop', i * 0.55) for i in range(4) if e('ps_chop', i * 0.55) < e('ps_humble', -0.1)]
    sfx = [
        # хук: лёд Амурского залива, «широта Сочи», треск льда
        ('ice_slide', 0.0, -4), ('wind_gust', 0.05, -6), ('shimmer', e('hk_sochi'), -5), ('ice_shatter', e('hk_ice'), -2), ('shiver_brr', e('hk_ice', 0.15), -4),
        ('watch_click', e('hk_wind'), 0), ('clock_tick_heavy', e('hk_wind', 0.2), -4), ('dive_splash', S0['tunnel'] - 0.25, -3), ('time_zoom', S0['tunnel'] - 0.05, -3),
        # 1859: палуба, подзорная труба, мираж Стамбула
        ('watch_click', S0['golden'] - 0.15, -4), ('ship_horn', S0['golden'] + 0.3, -8), ('shimmer', e('gd_ist'), -3), ('medal_fanfare', e('gd_name'), -8),
        # 1860: якорь, топоры, вывеска
        ('bubbles_burst', S0['post'] - 0.2, -6), ('weight_slam', S0['post'] - 0.05, -6), *[('axe_chop', c, -2) for c in chops], ('tiny_tuk', e('ps_humble', 0.05), 0), ('stamp_thud', e('ps_name'), -2), ('crowd_cheer', e('ps_name', 0.2), -10),
        # 1891: удар топора-раскол, сабля, тачка, паровоз
        ('axe_chop', S0['tsar'] - 0.12, 2), ('cloth_rip', S0['tsar'] - 0.05, -6), ('whip_whoosh', e('ts_sabre'), -2), ('boulder_roll', e('ts_cart', 0.1), -8), ('train_rush', e('ts_go'), -4), ('crowd_cheer', e('ts_go', 0.2), -8),
        # 1918: рывок по рельсам, марш, вспышка магния
        ('dust_whoosh', S0['interv'] - 0.2, -2), ('drum_march', e('iv_us', -0.1), -6), ('drum_march', e('iv_cz', 0.2), -8), ('flash_magnesium', e('iv_flash'), 0),
        # 1920: проявка, прожекторы, блик лысины
        ('flash_magnesium', S0['brynner'] - 0.1, -6), ('shimmer', e('br_name'), -6), ('teleport_pop', e('br_bald', 0.2), -4), ('medal_fanfare', e('br_holly'), -6),
        # 1935: кинолента, шторм, рында, штамп
        ('paper_whoosh', S0['anna'] - 0.2, -2), ('ship_bell', S0['anna'] + 0.2, -8), ('stamp_thud', e('an_first'), 2), ('wind_gust', e('an_cap'), -6), ('medal_fanfare', e('an_27'), -6),
        # 1959: штурвал, мечта, «пуф», фуникулёр
        ('vortex_suck', S0['khrush'] - 0.25, -4), ('shimmer', e('kh_sf'), -4), ('poof_cloth', e('kh_did'), 0), ('tiny_tuk', e('kh_fun'), -2), ('tiny_tuk', e('kh_fun', 0.25), -4),
        # 90-е: вагончик сквозь кадр, кран, руль, клаксон
        ('whip_whoosh', S0['japan'] - 0.2, 0), ('ship_horn', S0['japan'] + 0.2, -10), ('weight_slam', e('jp_ship', 0.35), -6), ('teleport_pop', e('jp_right'), -2), ('car_horn', e('jp_all'), -2),
        # 2012: дворники, золотой шов, рулетка, купюра
        ('whip_whoosh', S0['bridge'] - 0.15, -4), ('whip_whoosh', S0['bridge'] + 0.1, -6), ('rivets_steel', e('bg_rec', -0.4), -8), ('molten_pour', e('bg_rec'), -8), ('shimmer', e('bg_rec', 0.1), -4),
        ('scroll_unroll', e('bg_km'), -4), ('coins_pouch', e('bg_note'), -6), ('paper_whoosh', e('bg_note'), -2),
        # сегодня: купюра на просвет, призраки, тигр
        ('shimmer', S0['today'] - 0.1, -3), ('teleport_pop', e('td_ist'), -6), ('teleport_pop', e('td_sf'), -6), ('teleport_pop', e('td_sochi'), -6), ('tiger_roar', e('td_tiger', -0.05), -2), ('cat_meow', e('td_tiger', 0.15), -4),
        # кнопка: тигриные полосы, портал
        ('whip_whoosh', S0['button'] - 0.2, 0), ('portal_open', E['portal'], -6), ('clock_tick_heavy', e('bt_wink'), -4), ('clock_tick_heavy', DUR - 1.1, -6),
    ]
    beds = [('blizzard_loop', 0, S0['tunnel'] + 0.2), ('harbor_loop', S0['golden'], S1['golden']), ('forest_loop', S0['post'], S1['post']), ('city_loop', S0['tsar'], S1['tsar']),
            ('city_loop', S0['interv'], S1['interv']), ('harbor_loop', S0['brynner'], S1['brynner']), ('heavy_water_loop', S0['anna'], S1['anna']), ('harbor_loop', S0['khrush'], S1['khrush']),
            ('city_loop', S0['japan'], S1['japan']), ('wind_gust', S0['bridge'], S1['bridge']), ('blizzard_loop', S0['today'], S1['today']), ('harbor_loop', S0['button'], DUR)]
    return dict(sfx=sfx, beds=beds, music='music_vladivostok')
