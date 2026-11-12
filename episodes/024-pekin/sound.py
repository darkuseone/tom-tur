"""Звук выпуска 024 — Пекин: SFX и атмосферы от событий картинки (ev.json). Семейство переходов — тушь, свиток, фонари, шёлк.
Подпись выпуска — гонг (первый и последний звук, петля), эрху на вопросах, гучжэн на раскрытиях; фоли Тома и света — на каждое действие."""


def sound(T):
    E, S0, S1, LS, DUR = T.EV, T.S0, T.S1, T.LS, T.DUR
    e = lambda k, d=0.0: E[k] + d
    sfx = [
        # хук: гонг с 0,0 с, череп исчезает (пуф + звон), Том стучит по стеклу, штамп «ПРОПАЛ», эрху на «Где они?», часы
        ('gong_hit', 0.0, -3), ('stamp_thud', 0.02, -8), ('poof_cloth', e('hk_gone'), -4), ('teleport_pop', e('hk_gone', 0.03), -6), ('neon_off', e('hk_gone', 0.1), -12),
        ('glass_tap_ring', e('hk_knock'), -2), ('glass_tap_ring', e('hk_knock', 0.4), -6), ('whip_whoosh', e('hk_stamp', -0.15), -8), ('stamp_thud', e('hk_stamp', 0.05), -3), ('alarm_buzz', e('hk_stamp', 0.15), -16),
        ('erhu_sting', e('hk_q', -0.05), -8), ('tiny_tuk', e('hk_q', 0.1), -8), ('watch_click', E['h2'], 0), ('rewind', E['h2'] + 0.15, -4),
        ('ink_splat', S0['tunnel'] - 0.3, -3), ('time_zoom', S0['tunnel'] - 0.05, -3),
        # 1420: свиток, гонг двора, Том тянется к щели, ворота захлопываются, засов, табличка, стук в створку
        ('scroll_unroll', S0['palace'] - 0.12, -4), ('gong_hit', S0['palace'] + 0.12, -12), ('guzheng_gliss', e('pl_peek'), -10), ('shimmer', e('pl_point'), -10),
        ('gate_creak', e('pl_slam', -0.35), -10), ('palace_gate_slam', e('pl_slam', 0.1), -1), ('wooden_bar_drop', e('pl_slam', 0.34), -4), ('dust_whoosh', e('pl_slam', 0.2), -12),
        ('stamp_thud', e('pl_500'), -8), ('clock_tick_heavy', e('pl_500', 0.2), -10), ('wood_bonk', e('pl_knock'), -4), ('wood_bonk', e('pl_knock', 0.22), -6),
        # 1969: фонарь пролетает, обводка дворца, лопата, край рушится, падение, приземление, лампы цепочкой, сирена, карточка «СССР»
        ('lantern_whoosh', S0['dig'] - 0.22, -3), ('whip_whoosh', S0['dig'], -10), ('pencil_scribble', e('dg_point'), -8), ('shovel_dig', e('dg_dig', -0.1), -3), ('tectonic_split', e('dg_dig', 0.25), -10),
        ('collapse_rumble', e('dg_fall', -0.05), -6), ('whip_whoosh', e('dg_fall', 0.1), -6), ('weight_slam', e('dg_land'), -3), ('dust_whoosh', e('dg_land', 0.05), -10),
        ('switch_clunk', e('dg_lights'), -8), ('bulbs_chain_on', e('dg_lights', 0.05), -2), ('tiny_tuk', e('dg_lights', 0.3), -8), ('siren_curfew', e('dg_siren', -0.05), -8), ('alarm_buzz', e('dg_siren', 0.2), -14), ('stamp_thud', e('dg_ussr'), -4), ('paper_whoosh', e('dg_ussr', -0.12), -10),
        # 1979: шёлковый занавес, рубильник — искры — лампы, календарь, лампа тревоги гаснет, дорожка, неон, звонок на стойке
        ('silk_swish', S0['bunker'] - 0.2, -3), ('switch_clunk', e('bk_switch'), -2), ('arc_buzz', e('bk_switch', 0.03), -10), ('bulbs_chain_on', e('bk_switch', 0.08), -2),
        ('paper_whoosh', e('bk_ten', 0.1), -8), ('clock_tick_heavy', e('bk_ten', 0.3), -8), ('neon_off', e('bk_nowar'), -6), ('tiny_tuk', e('bk_nowar', 0.05), -8), ('pencil_scribble', e('bk_nowar', 0.15), -12), ('poof_cloth', e('bk_shrug'), -12),
        ('scroll_unroll', e('bk_hotel'), -6), ('guzheng_gliss', e('bk_hotel', 0.1), -8), ('arc_buzz', e('bk_neon', -0.05), -8), ('reception_bell', e('bk_neon', 0.05), 0), ('coins_pouch', e('bk_neon', 0.4), -12),
        # 1929: тушь стекает, провал камеры, кирки, кисть, пыль, череп светится (гонг тихо), счётчик лет
        ('ink_splat', S0['cave'] - 0.2, -4), ('whip_whoosh', S0['cave'] + 0.05, -8), ('rock_knock', S0['cave'] + 0.7, -12), ('chisel_strike', S0['cave'] + 1.1, -14),
        ('brush_dust', e('cv_brush'), 2), ('brush_dust', e('cv_dust', -0.3), 2), ('dust_whoosh', e('cv_dust'), -10), ('shimmer', e('cv_skull'), -4), ('gong_hit', e('cv_skull', 0.05), -12), ('crowd_cheer', e('cv_skull', 0.3), -20),
        ('clock_tick_heavy', e('cv_age'), -8), ('tiny_tuk', e('cv_age', 0.3), -8), ('tiny_tuk', e('cv_age', 0.6), -8), ('guzheng_gliss', e('cv_end'), -12),
        # 1937: жалюзи, взрыв вдали, пыль, марш колонны, грузовик, календарь, сейф захлопнут, штурвал, замок — музыка приглушена
        ('blinds_drop', S0['occup'] - 0.2, -3), ('cannon_boom', e('oc_war'), -4), ('collapse_rumble', e('oc_war', 0.1), -12), ('marching_boots', e('oc_japan', -0.2), -4), ('marching_boots', e('oc_japan', 2.4), -8), ('tractor_engine', e('oc_japan', 0.6), -16),
        ('typewriter', e('oc_8'), -10), ('stamp_thud', e('oc_8', 0.1), -8), ('whip_whoosh', e('oc_lock', -0.1), -10), ('safe_door_slam', e('oc_lock', 0.1), -1), ('safe_wheel_spin', e('oc_safe'), 0), ('switch_clunk', e('oc_safe', 0.55), -6),
        # 1941: пар, свисток, записка, ящик едет, летит в вагон, дверь вагона, пауза — мигает фонарь, сирена и газета, поезд уходит
        ('radiator_hiss', S0['crates'] - 0.25, -4), ('steam_whistle', S0['crates'] + 0.15, -14), ('pencil_scribble', e('cr_save'), -8), ('rope_creak', e('cr_two'), -8), ('wood_bonk', e('cr_two', 0.1), -8),
        ('whip_whoosh', e('cr_usa'), -6), ('wood_bonk', e('cr_usa', 0.42), -4), ('boxcar_door_slide', e('cr_door', -0.1), -3), ('neon_off', e('cr_pause'), -8), ('clock_tick_heavy', e('cr_pause', 0.15), -6),
        ('paper_whoosh', e('cr_ph', -0.12), -6), ('stamp_thud', e('cr_ph'), -2), ('siren_curfew', e('cr_ph', 0.05), -6), ('train_steam_depart', e('cr_ph', 0.35), -6),
        # порт: щелчок фонарика, ящики исчезают (эрху), карточка, лопата, «тук» в крышку, сияние, закапывает, асфальт, машины падают, «P», гонг-ответ
        ('switch_clunk', S0['parking'] - 0.2, -4), ('whip_whoosh', S0['parking'], -8), ('poof_cloth', e('pk_gone'), -4), ('erhu_sting', e('pk_gone', 0.1), -10), ('teleport_pop', e('pk_gone', 0.05), -8),
        ('tiny_tuk', e('pk_marine'), -6), ('watch_click', e('pk_marine', 0.2), -10), ('shovel_dig', e('pk_dig'), -2), ('wood_bonk', e('pk_hit'), 0), ('rock_knock', e('pk_hit', 0.05), -8), ('shimmer', e('pk_hit', 0.15), -6),
        ('shovel_dig', e('pk_bury'), -3), ('dust_whoosh', e('pk_bury', 0.3), -10), ('tractor_engine', e('pk_now'), -8), ('stone_saw', e('pk_now', 0.1), -16),
        ('weight_slam', e('pk_park', -0.25), -6), ('weight_slam', e('pk_park', -0.08), -8), ('arc_buzz', e('pk_park'), -10), ('gong_hit', e('pk_park', 0.02), -6), ('car_lock_beep', e('pk_park', 0.3), -2),
        # сегодня: фонарь поднимается, гучжэн, таблички-версии, вспышки камер, стук по гипсу, штамп «КОПИЯ», свет гаснет в вечер (эрху), призрак
        ('lantern_whoosh', S0['today'] - 0.22, -3), ('guzheng_gliss', S0['today'] + 0.05, -10), ('poof_cloth', e('td_shrug'), -12), ('teleport_pop', e('td_tags'), -6), ('teleport_pop', e('td_tags', 0.1), -8), ('teleport_pop', e('td_tags', 0.2), -8), ('teleport_pop', e('td_tags', 0.3), -10),
        ('camera_shutter', e('td_museum'), -4), ('rock_knock', e('td_knock'), -2), ('tiny_tuk', e('td_knock', 0.25), -4), ('stamp_thud', e('td_copy'), -4), ('camera_shutter', e('td_copy', 0.4), -10),
        ('neon_off', e('td_search'), -8), ('erhu_sting', e('td_search', 0.1), -8), ('shimmer', e('td_ghost'), -6),
        # кнопка: щелчок света, портал, жест, тик, череп вспыхивает в витрине — тот же гонг, что на 0,0 с (петля)
        ('switch_clunk', S0['button'] - 0.15, -4), ('portal_open', E['portal'], -6), ('whip_whoosh', e('bt_point'), -10), ('clock_tick_heavy', e('bt_wink'), -4), ('shimmer', e('bt_back', -0.1), -8), ('gong_hit', e('bt_back', 0.08), -3), ('stamp_thud', e('bt_back', 0.1), -8),
    ]
    beds = [('museum_night_loop', 0, S0['tunnel']), ('palace_court_loop', S0['palace'], S1['palace']), ('hutong_night_loop', S0['dig'], S1['dig']), ('bunker_hum_loop', E['dg_land'], S1['dig']),
            ('bunker_hum_loop', S0['bunker'], S1['bunker']), ('cave_drip_loop', S0['cave'], S1['cave']), ('occupation_night_loop', S0['occup'], S1['occup']), ('rail_station_night_loop', S0['crates'], S1['crates']),
            ('port_night_loop', S0['parking'], S1['parking']), ('night_city_loop', E['pk_now'], S1['parking']), ('museum_day_loop', S0['today'], S1['today']), ('museum_night_loop', S0['button'], DUR)]
    return dict(sfx=sfx, beds=beds, music='music_pekin', music_duck=[(S0['occup'] - 0.1, S1['occup'], -8), (E['cr_ph'], S0['parking'] + 0.4, -6)])
