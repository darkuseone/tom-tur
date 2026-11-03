"""Звук выпуска 023 — Тверь: SFX и атмосферы от событий картинки (ev.json) и реплик. Семейство переходов — грамоты, печати, ладьи."""


def sound(T):
    E, S0, S1, LS, DUR = T.EV, T.S0, T.S1, T.LS, T.DUR
    e = lambda k, d=0.0: E[k] + d
    sfx = [
        # хук: удар с 0,0 с, фуры, печать «СТОЛИЦА» падает на указатель, «?» над Москвой, часы
        ('stamp_thud', 0.0, -3), ('wind_gust', 0.02, -10), ('whip_whoosh', e('hk_seal', -0.15), -6), ('weight_slam', e('hk_seal', 0.05), -4), ('stamp_thud', e('hk_seal', 0.08), -6), ('teleport_pop', e('hk_q'), -6), ('tiny_tuk', e('hk_q', 0.2), -8),
        ('watch_click', e('hk_wind'), 0), ('rewind', e('hk_wind', 0.15), -4), ('scroll_unroll', S0['tunnel'] - 0.3, -4), ('time_zoom', S0['tunnel'] - 0.05, -3),
        # 1285: печать опускается, собор вспыхивает, тёшут камень, пузырь «Москва: дерево», табло 1:0
        ('stamp_thud', S0['sobor'] - 0.1, -4), ('shimmer', S0['sobor'] + 0.15, -10), ('chisel_strike', S0['sobor'] + 0.5, -12), ('collapse_rumble', e('sb_white'), -12), ('church_bell_toll', e('sb_white', 0.05), -8), ('wood_bonk', e('sb_moscow'), -8), ('wood_bonk', e('sb_wood'), -10), ('tiny_tuk', e('sb_score'), -4), ('switch_clunk', e('sb_score', 0.1), -10),
        # 1305: грамота раскатывается, луч на князя, грамота «всея Руси», колокола, табло 2:0
        ('scroll_unroll', S0['yarlyk'] - 0.2, -4), ('paper_whoosh', S0['yarlyk'], -10), ('shimmer', e('yr_prince'), -8), ('crowd_cheer', e('yr_prince', 0.1), -16), ('scroll_unroll', e('yr_title'), -6), ('church_bell_toll', e('yr_title', 0.1), -6), ('medal_fanfare', e('yr_first'), -14), ('tiny_tuk', e('yr_score'), -4), ('switch_clunk', e('yr_score', 0.1), -10),
        # 1317–1318: ладья-парус, стяг падает в снег, кони, ставка хана, свеча гаснет, донос, табло 3:0 → 3:1
        ('sail_flap', S0['bortenevo'] - 0.2, -4), ('whip_whoosh', S0['bortenevo'], -10), ('war_horn', e('bo_win', -0.1), -10), ('sword_clash', e('bo_win'), -8), ('dust_whoosh', e('bo_win', 0.1), -10), ('horse_neigh', e('bo_win', 0.3), -12), ('tiny_tuk', e('bo_score'), -4),
        ('glacier_groan', e('bo_horde'), -16), ('teleport_pop', e('bo_horde', 0.05), -8), ('radiator_hiss', e('bo_kill'), -14), ('paper_whoosh', e('bo_donos'), -6), ('stamp_thud', e('bo_donos', 0.15), -8), ('tiny_tuk', e('bo_score2'), -4),
        # 1327: ярлык рвётся, набат, пожар, топот конницы Калиты, монеты калиты, «+ ОРДА»
        ('cloth_rip', S0['uprising'] - 0.15, -4), ('church_bell_toll', S0['uprising'] + 0.2, -10), ('church_bell_toll', e('up_rise'), -6), ('crowd_cheer', e('up_rise', 0.1), -12), ('cloth_rip', e('up_rise', 0.1), -8), ('war_horn', e('up_horde'), -14), ('drum_march', e('up_kal', -0.1), -10), ('horse_neigh', e('up_kal', 0.2), -10), ('coins_pouch', e('up_kal', 0.4), -8), ('war_horn', e('up_army'), -8), ('stamp_thud', e('up_army', 0.05), -6),
        # 1468: карта, ладья по пунктиру, Индия: слон, верблюд, маршрут, каравелла «опоздал», табло 4:1
        ('paper_whoosh', S0['nikitin'] - 0.15, -6), ('pencil_scribble', S0['nikitin'] - 0.05, -10), ('sail_flap', S0['nikitin'] + 0.1, -10), ('elephants', S0['nikitin'] + 0.6, -14), ('teleport_pop', e('nk_name'), -8), ('pencil_scribble', e('nk_india'), -6), ('camel_grunt', e('nk_india', 0.3), -14), ('rope_creak', e('nk_vasko'), -10), ('stamp_thud', e('nk_gama'), -6), ('tiny_tuk', e('nk_gama', 0.1), -4),
        # 1485 (ответ): сургуч, карточка-разгадка, печати, мечи, бояре по мосткам, штамп «игра окончена»
        ('ink_splat', S0['answer'] - 0.2, -6), ('molten_pour', S0['answer'] - 0.1, -12), ('cannon_boom', S0['answer'] + 0.4, -14), ('paper_whoosh', e('answer'), -6), ('stamp_thud', e('answer', 0.1), -6), ('goblet_clink', e('an_horde'), -10), ('sword_clash', e('an_war'), -8), ('wood_bonk', e('an_boyars'), -10), ('coins_pouch', e('an_boyars', 0.2), -12), ('weight_slam', e('an_end'), -6), ('stamp_thud', e('an_end', 0.05), -4),
        # 1941: иней, табличка переворачивается, календарь, рассвет-освобождение, бирка — сдержанно, музыка приглушена
        ('glacier_groan', S0['kalinin'] - 0.2, -10), ('shiver_brr', S0['kalinin'], -12), ('switch_clunk', e('kl_name'), -6), ('wood_bonk', e('kl_name', 0.15), -10), ('typewriter', e('kl_occ'), -14), ('clock_tick_heavy', e('kl_occ', 0.1), -10), ('shimmer', e('kl_free'), -8), ('crowd_cheer', e('kl_free', 0.2), -14), ('tiny_tuk', e('kl_first'), -6),
        # сегодня: щит трассы опускается, призрак фуры «МИФ», табличка «Тверская», стрела к Твери, табло 5:1
        ('weight_slam', S0['today'] - 0.2, -8), ('whip_whoosh', S0['today'] + 0.1, -8), ('steam_whistle', e('td_myth'), -16), ('dust_whoosh', e('td_myth', 0.1), -8), ('teleport_pop', e('td_street'), -6), ('nav_ding', e('td_road'), -8), ('shimmer', e('td_tver'), -8), ('tiny_tuk', e('td_tver', 0.05), -4),
        # кнопка: ладья из часов, портал, печать снова падает на указатель (петля: тот же удар)
        ('portal_open', S0['button'] - 0.2, -6), ('sail_flap', S0['button'] - 0.1, -10), ('portal_open', E['portal'], -8), ('whip_whoosh', e('bt_point'), -10), ('clock_tick_heavy', e('bt_wink'), -4), ('whip_whoosh', e('bt_seal', -0.15), -6), ('stamp_thud', e('bt_seal', 0.08), -4),
    ]
    beds = [('highway_loop', 0, S0['tunnel']), ('gulls_river_loop', S0['sobor'], S1['sobor']), ('feast_loop', S0['yarlyk'], S1['yarlyk']), ('blizzard_loop', S0['bortenevo'], S1['bortenevo']),
            ('city_fire_loop', S0['uprising'], S1['uprising']), ('bazaar_loop', S0['nikitin'], S1['nikitin']), ('campfire_loop', S0['answer'], S1['answer']), ('blizzard_loop', S0['kalinin'], S1['kalinin']),
            ('night_city_loop', S0['today'], S1['today']), ('highway_loop', S0['button'], DUR)]
    return dict(sfx=sfx, beds=beds, music='music_tver', music_duck=[(S0['kalinin'] - 0.1, S1['kalinin'], -8)])
