"""Звук выпуска 029 — Крым: SFX и атмосферы от событий картинки (ev.json). Подпись выпуска — саз (первый звук глобуса и звук
«ПОДПИШИСЬ»), отмотка — штурвал и водоворот; музыка — music_krym (саз, кларнет, дарбука). Тяжёлые эпохи (1944, 2014) — музыка
приглушена. Одна концовка: после «отмотаем!» тишина."""


def sound(T):
    E, S0, S1, LS, DUR = T.EV, T.S0, T.S1, T.LS, T.DUR
    e = lambda k, d=0.0: E[k] + d
    sfx = [
        # хук: саз, глобус — наезд, облака, печати на карту, «45 000», штурвал
        ('saz_sting', 0.0, -4), ('time_zoom', e('hk_zoom'), -6), ('whip_whoosh', e('hk_zoom', 0.5), -8), ('wind_gust', e('hk_land', -0.1), -8), ('tiny_tuk', e('hk_globe', 0.2), -10),
        ('stamp_thud', e('hk_isk'), -4), ('stamp_thud', e('hk_st0'), -10), ('stamp_thud', e('hk_st1'), -10), ('stamp_thud', e('hk_st2'), -10), ('stamp_thud', e('hk_st3'), -10), ('stamp_thud', e('hk_st4'), -10), ('stamp_thud', e('hk_st5'), -10),
        ('tiny_tuk', e('hk_45'), -4), ('rope_creak', e('hk_wheel', 0.2), -4), ('rewind', e('hk_wheel', 0.3), -8),
        # отмотка: штурвал — водоворот
        ('vortex_suck', S0['tunnel'] - 0.15, -6), ('spin_whoosh', S0['tunnel'] + 0.1, -3), ('heavy_water_loop', S0['tunnel'] + 0.2, -8), ('dive_splash', S1['tunnel'] - 0.1, -6),
        # 45 000 лет: костёр, глава, кремень, бумажка «ПРОПИСКА» в огне
        ('fire_flare', S0['cave'] - 0.05, -8), ('stamp_thud', S0['cave'] + 0.3, -8), ('rock_knock', e('cv_who'), -6), ('paper_whoosh', e('cv_paper'), -6), ('fire_flare', e('cv_burn', 0.1), -2),
        # 988 Херсонес: искра, кран, колонна, купель, указатель «МОСКВА — ЕЩЁ НЕТ»
        ('shimmer', S0['herson'] - 0.1, -6), ('rope_creak', e('hs_build'), -6), ('chisel_strike', e('hs_build', 0.6), -10), ('church_bell_toll', e('hs_bapt'), -12), ('dive_splash', e('hs_prince'), -4),
        ('wood_bonk', e('hs_msk'), -4), ('stamp_thud', e('hs_no'), -4),
        # 1571 ханство: пыльный вал, глава, конница, рог, пожар Москвы
        ('dust_whoosh', S0['khan'] - 0.1, -4), ('stamp_thud', S0['khan'] + 0.3, -8), ('horse_neigh', e('kh_come'), -8), ('horses_gallop', e('kh_khans'), -2), ('war_horn', e('kh_burn'), -6), ('fire_flare', e('kh_msk'), -2),
        # 1783 Екатерина: свиток, шахматы, «независим», +9 лет, манифест и печать
        ('scroll_unroll', S0['ekat'] - 0.1, -4), ('wood_bonk', e('ek_play'), -4), ('table_crash', e('ek_play', 0.2), -14), ('tiny_tuk', e('ek_ind'), -4), ('metronome_tick', e('ek_nine'), -6), ('paper_whoosh', e('ek_take'), -6), ('stamp_thud', e('ek_take', 0.45), -2),
        # 1854 Севастополь: ядро сквозь кадр, залп флота, удар в бруствер, «пуф» — балаклава, спицы, бирка
        ('cannon_boom', S0['war'] - 0.1, -8), ('musket_volley', e('wr_fleet'), -8), ('cannon_boom', e('wr_fleet', 0.1), -6), ('cannon_boom', e('wr_hit'), -2), ('collapse_rumble', e('wr_hit', 0.1), -8),
        ('poof_cloth', e('wr_but'), -10), ('poof_cloth', e('wr_bal'), -4), ('knitting_click', e('wr_bal', 0.15), 0), ('tiny_tuk', e('wr_card'), -4),
        # 1944: состав мимо, глава, руины, календарь, двери вагона, гудок, состав трогается
        ('train_rush', S0['deport'] - 0.15, -8), ('stamp_thud', S0['deport'] + 0.3, -10), ('wind_gust', e('dp_ruin'), -10), ('boxcar_door_slide', e('dp_stalin'), -6), ('paper_whoosh', e('dp_days'), -6),
        ('tiny_tuk', e('dp_num'), -6), ('steam_whistle', e('dp_num', 0.1), -8), ('train_steam_depart', e('dp_num', 0.4), -8), ('clock_tick_heavy', e('dp_tat'), -12),
        # 1954 → 1991: машинка, кусок карты, указ, проброс камеры, бюллетень, табло
        ('typewriter', S0['ussr'] - 0.1, -6), ('paper_whoosh', e('us_54'), -8), ('wood_bonk', e('us_give'), -6), ('stamp_thud', e('us_give', 0.1), -4), ('whip_whoosh', e('us_91'), -4), ('paper_whoosh', e('us_vote', -0.3), -8), ('nav_ding', e('us_vote'), -6),
        # 1994 → 2014: лист складывается, подпись, пунктир границ, разрыв, колонна, вертолёты, печать «АННЕКСИЯ»
        ('paper_whoosh', S0['annex'] - 0.1, -6), ('pencil_scribble', e('an_promise'), -6), ('shimmer', e('an_border'), -8), ('cloth_rip', e('an_14'), -2), ('convoy_trucks', e('an_14', 0.3), -4),
        ('heli_sputter', e('an_troops'), -8), ('stamp_thud', e('an_take', 0.3), -2),
        # ООН: табло перекидывается, молоток, счёт голосов, ответ — печать «УКРАИНА», «единицы»
        ('blinds_drop', S0['today'] - 0.1, -8), ('gavel_bang', e('td_q'), 0), ('metronome_tick', e('td_un'), -6), ('tiny_tuk', e('td_un', 0.4), -8), ('stamp_thud', e('answer'), -2), ('shimmer', e('answer', 0.1), -10), ('tiny_tuk', e('td_few'), -4),
        # кнопка: печати хозяев по одной, ПОДПИШИСЬ на «Пиши» (саз); после голоса — тишина
        ('tiny_tuk', S0['button'] + 0.15, -8), ('tiny_tuk', S0['button'] + 0.45, -8), ('tiny_tuk', S0['button'] + 0.75, -8), ('tiny_tuk', S0['button'] + 1.05, -8), ('tiny_tuk', S0['button'] + 1.35, -8), ('tiny_tuk', S0['button'] + 1.65, -8),
        ('teleport_pop', e('portal'), -10), ('wood_bonk', e('bt_who'), -8), ('teleport_pop', e('endcard'), -4), ('saz_sting', e('endcard', 0.05), -10),
    ]
    beds = [('sea_waves_loop', 0, S0['tunnel']), ('gulls_river_loop', E['hk_land'], S0['tunnel']), ('campfire_loop', S0['cave'], S1['cave']), ('crickets_loop', S0['cave'], S1['cave']),
            ('sea_waves_loop', S0['herson'], S1['herson']), ('palace_court_loop', S0['khan'], S1['khan']), ('city_fire_loop', E['kh_burn'], S1['khan']), ('street_1770_loop', S0['ekat'], S1['ekat']),
            ('steppe_wind_loop', S0['war'], S1['war']), ('rail_station_night_loop', S0['deport'], S1['deport']), ('museum_day_loop', S0['ussr'], S1['ussr']), ('city_loop', E['us_91'], S1['ussr']),
            ('museum_night_loop', S0['annex'], S1['annex']), ('storm_rain_loop', E['an_14'], S1['annex']), ('museum_day_loop', S0['today'], DUR)]
    return dict(sfx=sfx, beds=beds, music='music_krym', music_duck=[(S0['deport'] - 0.1, S1['deport'], -6), (E['an_14'], S1['annex'], -6)])
