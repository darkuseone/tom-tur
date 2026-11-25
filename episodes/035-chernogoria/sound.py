"""Звук выпуска 035 — Черногория: подпись — гусле (первый звук глобуса, драма, «ПОДПИШИСЬ»), штампы досье — каждая улика;
музыка — music_chernogoria (мандолина, тамбурица). 1918 — музыка приглушена. Одна концовка: после «отмотаем!» тишина."""


def sound(T):
    E, S0, S1, LS, DUR = T.EV, T.S0, T.S1, T.LS, T.DUR
    e = lambda k, d=0.0: E[k] + d
    sfx = [
        # хук: гусле, глобус, газета-сенсация, подзорная труба, штамп «БАЙКА?»
        ('gusle_sting', 0.0, -4), ('time_zoom', e('hk_zoom'), -6), ('whip_whoosh', e('hk_zoom', 0.5), -8), ('wind_gust', e('hk_land', -0.1), -8), ('paper_whoosh', e('hk_war'), -6),
        ('teleport_pop', e('hk_war', 0.1), -10), ('silk_swish', e('hk_check'), -8), ('stamp_thud', e('hk_tale'), -2), ('rewind', e('hk_go', 0.3), -10),
        # отмотка: волна
        ('spin_whoosh', S0['tunnel'] + 0.05, -3), ('dive_splash', S0['tunnel'] + 0.25, -4), ('bubbles_burst', S0['tunnel'] + 0.6, -8), ('shimmer', S1['tunnel'] - 0.2, -6),
        # XV в.: глава, вёсла, чайки, перо по карте, гора темнеет, плашка
        ('stamp_thud', S0['name'] + 0.3, -8), ('rope_creak', S0['name'] + 0.5, -10), ('pencil_scribble', e('nm_mn'), -4), ('collapse_rumble', e('nm_black'), -14), ('tiny_tuk', e('nm_wood'), -4),
        # Котор: волна-переход, лев, монеты, счётчик лет, колокол монастыря
        ('dive_splash', S0['kotor'] - 0.1, -10), ('shimmer', e('kt_ven'), -6), ('coins_pouch', e('kt_ven', 0.3), -8), ('metronome_tick', e('kt_400'), -8), ('whip_whoosh', e('kt_mnt'), -10), ('church_bell_toll', e('kt_bish'), -12),
        # 1878: штамп-улика, глава, молоток, печать, бокалы
        ('stamp_thud', S0['berlin'] - 0.05, -2), ('stamp_thud', S0['berlin'] + 0.3, -8), ('gavel_bang', e('bl_rec'), -2), ('stamp_thud', e('bl_ind', 0.1), -6), ('goblet_clink', e('bl_con'), -6),
        # 1904: глава, прощание, карта, марш добровольцев
        ('whip_whoosh', S0['volunteers'] - 0.1, -8), ('stamp_thud', S0['volunteers'] + 0.3, -8), ('paper_whoosh', e('vl_map'), -8), ('pencil_scribble', e('vl_war'), -6), ('drum_march', e('vl_go'), -8), ('crowd_cheer', e('vl_go', 0.2), -14),
        # 1904–1905: слухи в кафе, «объявили!», Портсмут: подпись, вспышка, штамп «без неё»
        ('paper_whoosh', S0['peace'] - 0.1, -6), ('tiny_tuk', e('pc_say'), -6), ('tiny_tuk', e('pc_say', 0.25), -6), ('gusle_sting', e('pc_decl'), -8), ('pencil_scribble', e('pc_sign'), -6), ('camera_shutter', e('pc_sign', 0.05), -4), ('stamp_thud', e('pc_wo'), -2),
        # 1918: дождь, табличка падает, карта, шутка
        ('neon_off', S0['yugo'] - 0.05, -8), ('wood_bonk', e('yg_gone', 0.3), -4), ('paper_whoosh', e('yg_map'), -8), ('collapse_rumble', e('yg_gone', 0.1), -14), ('tiny_tuk', e('yg_joke'), -4),
        # 2006: вспышка, глава, табло крутит, порог, салют
        ('shimmer', S0['vote'] - 0.1, -6), ('stamp_thud', S0['vote'] + 0.3, -8), ('metronome_tick', e('vt_2006'), -8), ('lottery_balls', e('vt_2006', 0.3), -12), ('medal_fanfare', e('vt_half'), -10), ('fireworks', e('vt_half', 0.2), -8), ('crowd_cheer', e('vt_half', 0.1), -8), ('tiny_tuk', e('vt_thr'), -4),
        # Япония: конверт, письмо, штамп «дело закрыто»
        ('paper_whoosh', S0['japan'] - 0.1, -8), ('camera_shutter', e('jp_rec', -0.2), -8), ('paper_whoosh', e('jp_rec'), -6), ('scroll_unroll', e('jp_close'), -6), ('stamp_thud', e('jp_war'), -2),
        # сегодня: вердикт — два штампа
        ('wind_gust', S0['today'] - 0.1, -10), ('paper_whoosh', e('answer', -0.1), -6), ('stamp_thud', e('td_leg', -0.3), -2), ('stamp_thud', e('td_peace'), -4), ('nav_ding', e('td_peace', 0.3), -10),
        # кнопка: «ПОДПИШИСЬ» на «Пиши» (гусле); после голоса — тишина
        ('whip_whoosh', S0['button'] - 0.2, -12), ('teleport_pop', e('bt_send'), -8), ('nav_ding', e('bt_send', 0.3), -8), ('teleport_pop', e('endcard'), -4), ('gusle_sting', e('endcard', 0.05), -8),
    ]
    beds = [('sea_waves_loop', 0, S0['tunnel']), ('gulls_river_loop', E['hk_land'], S0['tunnel']), ('sea_waves_loop', S0['name'], S1['name']), ('gulls_river_loop', S0['name'], S1['name']),
            ('bazaar_loop', S0['kotor'], S1['kotor']), ('palace_court_loop', S0['berlin'], S1['berlin']), ('old_square_loop', S0['volunteers'], S1['volunteers']), ('old_square_loop', S0['peace'], S1['peace']), ('feast_loop', S0['peace'], E['pc_peace']),
            ('palace_court_loop', E['pc_peace'], S1['peace']), ('storm_rain_loop', S0['yugo'], S1['yugo']), ('night_city_loop', S0['vote'], S1['vote']), ('palace_court_loop', S0['japan'], S1['japan']),
            ('sea_waves_loop', S0['today'], S1['today']), ('sea_waves_loop', S0['button'], DUR)]
    return dict(sfx=sfx, beds=beds, music='music_chernogoria', music_duck=[(S0['yugo'], S1['yugo'], -6)])
